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
function LocalTestExecutor() { }

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
		var testConfig = test.getTestConfig();

		if (!testConfig.execution || !testConfig.execution.entryPoint) throw new Error('No entryPoint defined for skill execution');
		var idx = testConfig.execution.entryPoint;

		if (testConfig && testConfig.execution && testConfig.execution.workingDirectory) {		
			var testWD = testConfig.execution.workingDirectory;
		    var curDir = process.cwd();

		    var eChangeDir = false;
			try {
			    fs.accessSync(testWD, fs.F_OK);
				process.chdir(testWD);
				console.log("Changing working directory to "+testWD);

				eChangeDir = true;

			} catch (e) {
			    throw new Error('Could not change to working directory '
			    	+ testConfig.execution.workingDirectory
			    	+ ' with current directory '+process.cwd());
			}

			if (eChangeDir) {
				idx = require(process.cwd()+'/'+testConfig.execution.entryPoint);
			}
		}

		idx.handler(testConfig.input, resultHandler);

	}
}

module.exports = LocalTestExecutor;