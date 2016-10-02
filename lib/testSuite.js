/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */
"use strict";

/**
 * Reprents a collection of tests that can be executed all at once or individually
 *
 * @function
 * @param {Array.Test} tests The tests that represent a group of tests to execute
 */
function TestSuite(tests) {
	this._tests = tests;

	this._testKey = {};
	for (var testIdx=0;testIdx<this._tests.length;testIdx++) {
		this._testKey[this._tests[testIdx].getName()] = testIdx;
	}
}

TestSuite.prototype = {

	/**
	 * Executes all of the tests in the order they were passed in
	 * 
	 * @function
	 */
	runSuite : function() {
		for (var testIdx=0;testIdx<this._tests.length;testIdx++) {
			console.log("Running test "+this._tests[testIdx].getName());
			this._tests[testIdx].run();
		}
	},

	/**
	 * Executes a single test
	 * 
	 * @function
	 * @param  {String} testName The test to execute
	 */
	runTest : function(testName) {
		console.log("Running test "+testName);
		this._tests[this_testKey[testName]].run();
	}

}

module.exports = TestSuite;