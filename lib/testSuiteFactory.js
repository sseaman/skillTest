/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */
"use strict";

/** @private */
var DefaultTestBuilder = require('./defaultTestBuilder.js');
var TestSuite = require('./testSuite.js');
var fs = require('fs');
var path = require('path');

const GLOBAL_FILE = 'global.json';

/**
 * Helper object for creation {@link TestSuite}s
 *
 * @constructor
 */
function TestSuiteFactory() { }

/**
 * Create a test suite using the passed in map as configuration
 * 
 * @function
 * @param  {Object} map  The map to use for configuration
 * @param  {TestBuilder} testBuilder The builder to use when creating the tests from the Map
 * @return {TestSuite}  The TestSuite representing all of the test registered
 */
TestSuiteFactory.fromMap = function(map, testBuilder) {
	var builder = (testBuilder) 
		? testBuilder
		: new DefaultTestBuilder();

	builder.withGlobals(map.globals);

	var tests = [];
	for (var testIdx=0;testIdx<map.tests.length; testIdx++) {
		tests[testIdx] = builder.withTestConfig(map.tests[testIdx]).build();
		console.log("Registered Test: '"+tests[testIdx].getName()+"'");
	}

	return new TestSuite(tests);
}

/**
 * Create a test suite by reading the test configuration files from a specified directory.
 *
 * This will look for 'global.json' in the direcotry to use for global settings.  All other files
 * in the directory will be loaded as test configuration
 * 
 * @function
 * @param  {String} directory  The directory to read all files in
 * @param  {TestBuilder} testBuilder The builder to use when creating the tests from the Map
 * @return {TestSuite}  The TestSuite representing all of the test registered
 */
TestSuiteFactory.fromDirectory = function(directory, testBuilder) {
	var builder = (testBuilder) 
		? testBuilder
		: new DefaultTestBuilder();

	var globals;
	try {
		globals = require(directory+GLOBAL_FILE);
	}
	catch (e) {}

	builder.withGlobals(globals);

	var tests = [];
	var files = fs.readdirSync(directory);
	for (var i=0;i<files.length;i++) {
		if (!path.basename('global.json')) {
			tests[testIdx] = builder.withTestConfig(require(files[i]));
			console.log("Registered Test: '"+tests[testIdx].getName()+"'");
		}
	}

	return new TestSuite(tests);
}

/**
 * Create a test suite by reading the test configuration files.
 *
 * This will look for 'global.json' in the list of tiles to use for global settings.  
 * All other files will be loaded as test configuration
 * 
 * @function
 * @param  {Array.String} files  The files to load as tests
 * @param  {TestBuilder} testBuilder The builder to use when creating the tests from the Map
 * @return {TestSuite}  The TestSuite representing all of the test registered
 */
TestSuiteFactory.fromFiles = function(files, testBuilder) {
	var builder = (testBuilder) 
		? testBuilder
		: new DefaultTestBuilder();

	var loadedFiles = [];
	var lIdx = 0;
	var globals;
	for (var i=0;i<files.length;i++) {
		if (path.basename(GLOBAL_FILE)) {
			globals = require(files[i]);
		}
		else {
			loadedFiles[lIdx++] = require(files[i]);
		}
	}

	builder.withGlobals(globals);

	var tests = [];
	for (var i=0;i<loadedFiles.length;i++) {
		tests[testIdx] = builder.withTestConfig(loadedFiles[i]);
		console.log("Registered Test: '"+tests[testIdx].getName()+"'");
	}

	return new TestSuite(tests);
}

module.exports = TestSuiteFactory;