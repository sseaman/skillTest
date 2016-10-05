/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */
"use strict";

var nAssert = require('assert');
var deepExtend = require('deep-extend');

/**
 * Takes the results from the Skill and does an comparison to what was expected
 * 
 * @constructor
 */
function DefaultTestResultHandler() { }

DefaultTestResultHandler.prototype = {
	
	/**
	 * Process the results of a test.
	 *
	 * This works by taking the results from the Skill and comparing it to what was expected based on the
	 * test configuration.  Any differences will be displayed to the console
	 *
	 * @function
	 * @param  {Test} test The test that was executed
	 */
	processResult : function(test) {
		var cleanResult = test.getResult();

		// Merge the result with what the test config is looking for.  
		// This created a final result that is similar to the actual skill result but has the values the test defined
		var mergedResult = deepExtend({}, test.getResult(), test.getExpectedResult()); 

		try {
			nAssert.deepEqual(cleanResult, mergedResult);
			console.log("Test '"+test.getName()+ "' passed");
		}
		catch (e) {
			var msg = e.message.split("deepEqual");
			console.error("Test '"+test.getName()+"' failed. \n"
				+"Received: \n"+
				msg[0]
				+"\nExpected: \n"+
				msg[1]);
		}
	}
}

module.exports = DefaultTestResultHandler;