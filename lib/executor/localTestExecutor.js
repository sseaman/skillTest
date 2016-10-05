/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */

"use strict";

/** @private */
const fs = require('fs');

/**
 * Execute a Skill test against a local instance of the Skill
 *
 * @constructor
 * @implements {TestExecutor}
 */
function LocalTestExecutor(config) { 
	if (!config || !config.workingDirectory) throw new Error("workingDirectory not set in config");
	if (!config || !config.entryPoint) throw new Error("entryPoint not set in config");

	this._config = config;
}

LocalTestExecutor.prototype = {

	/**
	 * Runs the test.
	 *
	 * To ensure proper execution, this will change to the working directory specified by the
	 * @{link Test}s config.execution.workingDirectory (if specified).  It will then execute the Skill
	 * by calling the {@link Test}s config.execution.entryPoint's handle function.
	 *
	 *
	 * @function
	 * @param  {Test} test The test to execute
	 * @param  {SkillResultHandler} resultHandler The ResultHandler to pass into the skill
	 */
	runTest : function(test, resultHandler) {
		var idx = this._config.entryPoint;
	
		var testWD = this._config.workingDirectory;
	    var curDir = process.cwd();

	    var eChangeDir = false;
		try {
		    fs.accessSync(testWD, fs.F_OK);
			process.chdir(testWD);
			console.log("Changing working directory to "+testWD);

			eChangeDir = true;

		} catch (e) {
		    throw new Error('Could not change to working directory '
		    	+ this._config.workingDirectory
		    	+ ' with current directory '+process.cwd());
		}

		if (eChangeDir) {
			idx = require(process.cwd()+'/'+this._config.entryPoint);
		}

		idx.handler(test.getTestConfig(), resultHandler);

	}
}

module.exports = LocalTestExecutor;