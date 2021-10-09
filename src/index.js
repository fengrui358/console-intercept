let isIntercept = false;
let interceptFuns = [];
var isBrowser =
    typeof window !== 'undefined' &&
    {}.toString.call(window) === '[object Window]';
var isNode =
    typeof global !== 'undefined' &&
    {}.toString.call(global) === '[object global]';

const rewrite = function (origConsole) {
    let result = {};
    Object.values(console)
        .filter((s) => typeof s === 'function')
        .forEach((f) => {
            result[f.name] = function () {
                let args = [...arguments];
                origConsole[f.name].apply(null, args);
                interceptFuns.forEach((fun) => {
                    fun(f.name, [...arguments]);
                });
            };
        });

    return result;
};
export const intercept = function (fun) {
    if (typeof fun === 'function') {
        interceptFuns.push(fun);
    }

    if (!isIntercept) {
        isIntercept = true;
        if (isNode) {
            global.console = rewrite(global.console);
        } else if (isBrowser) {
            window.console = rewrite(window.console);
        }
    }
};

export const interceptRemoteLog = function (appName, url) {
    intercept(function (name, args) {
        let request = {
            appName: appName,
            logLevel: name,
            logTime: new Date(),
        };

        let messages = [];
        args.forEach((m) => {
            if (m != null) {
                if (typeof m === 'string') {
                    messages.push(m);
                } else if (m instanceof Error) {
                    messages.push(
                        JSON.stringify(m, Object.getOwnPropertyNames(m))
                    );
                } else if (typeof m === 'object') {
                    messages.push(JSON.stringify(m));
                } else {
                    messages.push(m.toString());
                }
            }
        });

        const body = JSON.stringify(request);
        if (isNode) {
            const urlObj = new URL(url);
            let invoker = require(urlObj.protocol.slice(0, urlObj.protocol.length - 1));
            const req = invoker.request({
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': body.length,
                },
            });

            req.write(body);
            req.end();
        } else if (isBrowser) {
            let req = new XMLHttpRequest();
            req.open('POST', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(body);
        }
    });
};
