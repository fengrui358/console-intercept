let isIntercept = false;
let interceptFuns = [];

export const intercept = function (fun) {
    if (typeof fun === 'function') {
        interceptFuns.push(fun);
    }

    if (!isIntercept) {
        isIntercept = true;

        window.console = (function (origConsole) {
            let result = {};

            Object.values(console)
                .filter((s) => typeof s === 'function')
                .forEach((f) => {
                    result[f.name] = function () {
                        let args = [...arguments];
                        origConsole[f.name].apply(origConsole, args);
                        interceptFuns.forEach((fun) => {
                            fun(f.name, [...arguments]);
                        });
                    };
                });

            return result;
        })(window.console);
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

        let req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(request));
    });
};
