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
var path = require('path');

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
	 * Builds an instance of a Test.  If a template was specified for global or test it 
	 * will use the template to augment the test config.
	 * 
	 * @function
	 * @return {Test} A new instance of a Test built based on the information in this builder
	 */
	build : function() {
		var tmpConfig = this._testConfig;
		if (this._testConfig && this._testConfig.input && this._testConfig.input.template) {
			var template = require(path.format({
				dir : process.cwd(),
				base : this._testConfig.input.template
			}));
			// as this extends what is in input (and not input itself), 
			// I need to put it back as input for use with globals
			tmpConfig.input = deepExtend({}, template, this._testConfig.input);

			delete tmpConfig.template; // pull out the reference of the template
		}

		var tmpGlobal = this._globals;
		if (this._globals && this._globals.input && this._globals.input.template) {
			// TODO: as this is global and should only ever occur once, this is wasteful
			// 		as it will occur for each test
			var template = require(path.format({
				dir : process.cwd(),
				base : this._globals.input.template
			}));
			tmpGlobal = deepExtend({}, template, this._globals.input);
			
			delete tmpGlobal.template;// pull out the reference of the template
		}

		return new Test(
			{
				"test" : deepExtend({}, tmpGlobal, tmpConfig),
				"executor" : this._executor,
				"resultHandler" : this._resultHandler
			}
		);
	}
}

module.exports = DefaultTestBuilder;