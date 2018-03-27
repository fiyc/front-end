var sp = require('stampit');

var a = sp().init(function () {
    console.log('this is a');
});


var b = sp().init(function () {
    console.log('this is b');
});

a = a.compose(b);
var c = a();

// const stamp = stampit().init((opts, { instance }) => {
//     const factor = opts.factor || 1;
//     instance.getFactor = () => factor;
// });

// console.log(stamp().getFactor()); // 1
// console.log(stamp({ factor: 2.5 }).getFactor()); // 2.5
