var { intercept } = require('../dist/index.js');
intercept((name, args) => {
    return args.reduce((pre, curr) => pre + curr);
});
console.log(1, 2);
