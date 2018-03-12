var fib = require('./main.js');
var should = require('should');



describe('test/main.test.js', function(){
		it('should equal 56 when n === 10', function(){
				fib(10).should.equal(55);
		});
});

