var chai = require('chai');
var treetrizer = require('../index')
describe('treetrizer.isValid', function () {

  it(' "1" should be valid pathes', function() {
    chai.assert.equal(treetrizer.isValid('1'), true);
  });

  it(' "1.2" should be valid pathes', function() {
    chai.assert.equal(treetrizer.isValid('1.2'), true);
  });

  it(' "1.2.5" should be valid pathes', function() {
    chai.assert.equal(treetrizer.isValid('1.2.5'), true);
  });

  it(' "100.226.554" should be valid pathes', function() {
    chai.assert.equal(treetrizer.isValid('100.226.554'), true);
  });

  it(' "1-2" should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('1-2'), false);
  });

  it(' "1*2" should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('1*2'), false);
  });

  it(' "1/5" should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('1/5'), false);
  });

  it(' "1a.sd" should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('1a.sd'), false);
  });

  it(' "aaa" should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('aaa'), false);
  });

  it(' "." should be invalid path', function() {
    chai.assert.equal(treetrizer.isValid('.'), false);
  });

});