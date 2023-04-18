const {Timer} = require("../main");
const assert = require('assert');

describe('Timer', function() {
  it('should tick-tock without label', function(done) {
    const timer = new Timer();
    timer.tick();
    setTimeout(() => {
      const duration = timer.tock();
      assert.equal(parseInt(duration) - 1000 >= 0, true);
      assert.equal(parseInt(duration) - 1000 < 10, true);
      done();
    }, 1000);
  });

  it('should tick-tock without label using high resolution timer', function(done) {
    const timer = new Timer(true);
    timer.tick();
    setTimeout(() => {
      const duration = timer.tock();
      assert.equal(parseInt(duration) - 1000000000 > 0, true);
      done();
    }, 1000);
  });

  it('should allow to tock multiple times', function(done) {
    this.timeout(4000);
    const timer = new Timer();
    timer.tick();
    setTimeout(() => {
      const duration = timer.tock();
      assert.equal(parseInt(duration) > 990, true);
      assert.equal(parseInt(duration) < 1010, true);
    }, 1000);
    setTimeout(() => {
      const duration = timer.tock();
      assert.equal(parseInt(duration) > 990, true);
      assert.equal(parseInt(duration) < 1010, true);
    }, 2000);
    setTimeout(() => {
      const duration = timer.tock();
      assert.equal(parseInt(duration) > 990, true);
      assert.equal(parseInt(duration) < 1010, true);
      done();
    }, 3000);
  });

  it('should tick-tock with label', function(done) {
    const timer = new Timer();
    timer.tick();
    setTimeout(() => {
      const regexp = new RegExp('demo completed in \\d+ ms')
      const text = timer.tock('demo');
      assert.equal(regexp.test(text), true);
      done();
    }, 1000);
  });

  it('should tick-tock with label using high resolution timer', function(done) {
    const timer = new Timer(true);
    timer.tick();
    setTimeout(() => {
      const regexp = new RegExp('demo completed in \\d+ ns')
      const text = timer.tock('demo');
      assert.equal(regexp.test(text), true);
      done();
    }, 1000);
  });
});