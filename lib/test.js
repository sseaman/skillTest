/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */
"use strict";

/**
 * Represents a test to be run.  
 * 
 * @constructor
 * @param {Object} config Configuration parameter for the Test
 * @param {Object} config.test The configuration for the test
 * @param {TestExecutor} config.executor The {@link TestExecutor} to use when executing this Test
 * @param {TestResultHandler} config.resultHandler The {@link TestResultHandler} to use to process the results of the test
 */
function Test(config) {
	if (!config || !config.test) throw new Error('test not specified');
	if (!config || !config.executor) throw new Error('executor not specified');
	if (!config || !config.resultHandler) throw new Error('resultHandler not specified');

	this._config = config;
	this._results;
	this._hasCompleted = false;
}

Test.prototype = {
	
	/**
	 * Return the configuration of the test
	 * 
	 * @function
	 * @return {Object} The configuration of the test
	 */
	getTestConfig : function() {
		return this._config.test;
	},

	/**
	 * Returns the name of the test
	 * 
	 * @function
	 * @return {String} The name of the test
	 */
	getName : function() {
		return this._config.test.name;
	},

	/**
	 * Returns the results of the test.  If the test has not completed (check hasCompleted()) this will
	 * return null
	 *
	 * @function
	 * @return {Object} The result of the test
	 */
	getResult : function() {
		return this._result;
	},

	/**
	 * True if the test has completed execution.  False otherwise
	 *
	 * @function
	 * @return {Boolean} True if test has completed.  False otherwise
	 */
	hasCompleted : function() {
		return this._hasCompleted;
	},

	/**
	 * Executes the test.
	 * 
	 * @function
	 */
	run : function() {
		this._hasCompleted = false;

		var test = this;
		this._config.executor.runTest(test, {
			succeed : function(result) {
				test._result = result;
				test._hasCompleted = true;
				test._config.resultHandler.processResult(test, result);
			},
			fail : function(result) {
				test._result = result;
				test._hasCompleted = true;
				test._config.resultHandler.processResult(test, result);
			}
		});
	}
}

module.exports = Test;