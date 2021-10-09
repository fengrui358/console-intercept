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
                        interceptFuns.forEach(fun => {
                            fun(f.name, [...arguments]);
                        });
                    };
                });
    
            return result;
        })(window.console);
    }
};
