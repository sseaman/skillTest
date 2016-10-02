/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */
"use strict";

var Test = require('./test.js');
var LocalTestExecutor = require('./executor/localTestExecutor.js');
var DefaultTestResultHandler = require('./defaultTestResultHandler.js');
var deepExtend = require('deep-extend');

/**
 * Builds a Test based on the passed in values, or on the fly
 * 
 * @param {Object} [globals]     The global values set for all tests
 * @param {Object} [testConfig]  The configuration to use for the test
 * @param {TestExecutor} [executor]  The TestExecutor to register with the test and later use
 * @param {TestResultHandler} [resultHandler] The TestResultHandler to register with the test and later use
 */
function DefaultTestBuilder(globals, testConfig, executor, resultHandler) { 
	this._globals = globals;

	this._testConfig = null;

	this._executor = (executor)
		? executor
		: new LocalTestExecutor();

	this._resultHandler = (resultHandler)
		? resultHandler
		: new DefaultTestResultHandler();
}

DefaultTestBuilder.prototype = {
	
	/**
	 * Sets the globals to use when building a Test
	 *
	 * @function
	 * @param  {Object} globals The global values set for all tests
	 * @return {TestBuilder}  An instance of this
	 */
	withGlobals : function(globals) {
		this._globals = globals;
		return this;
	},

	/**
	 * The TestExecutor to register with the test and later use
	 *
	 * @function
	 * @param {TestExecutor} executor  The TestExecutor to register with the test and later use
	 * @return {TestBuilder}  An instance of this
	 */
	withExecutor : function(executor) {
		this._executor = executor;
		return this;
	},

	/**
	 * The TestResultHandler to register with the test and later use
	 *
	 * @function
	 * @param {TestResultHandler} [resultHandler] The TestResultHandler to register with the test and later use
	 * @return {TestBuilder}  An instance of this
	 */
	withResultHandler : function(resultHandler) {
		this._resultHandler = resultHandler;
		return this;
	},

	/**
	 * The configuration to use for the test
	 *
	 * @function
	 * @param {Object} [testConfig]  The configuration to use for the test
	 * @return {TestBuilder}  An instance of this
	 */
	withTestConfig : function(testConfig) {
		this._testConfig  = testConfig;
		return this;
	},

	/**
	 * Builds an instance of a Test
	 * 
	 * @function
	 * @return {Test} A new instance of a Test built based on the information in this builder
	 */
	build : function() {
		return new Test(
			{
				"test" : deepExtend({}, this._globals, this._testConfig),
				"executor" : this._executor,
				"resultHandler" : this._resultHandler
			}
		);
	}
}

module.exports = DefaultTestBuilder;