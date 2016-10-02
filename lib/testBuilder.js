/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */

/**
 * Interface for any object that wants to build tests based on some sort of configuration
 *
 * @interface
 */

/**
 * Sets the globals to use when building a Test
 *
 * @function
 * @name  TestBuilder#withGlobals
 * @param  {Object} globals The global values set for all tests
 * @return {TestBuilder}  An instance of this
 */

/**
 * The TestExecutor to register with the test and later use
 *
 * @function
 * @name  TestBuilder#withExectuor
 * @param {TestExecutor} executor  The TestExecutor to register with the test and later use
 * @return {TestBuilder}  An instance of this
 */

/**
 * The TestResultHandler to register with the test and later use
 *
 * @function
 * @name  TestBuilder#withResultHandler
 * @param {TestResultHandler} [resultHandler] The TestResultHandler to register with the test and later use
 * @return {TestBuilder}  An instance of this
 */

/**
 * The configuration to use for the test
 *
 * @function
 * @name  TestBuilder#withTestConfig
 * @param {Object} [testConfig]  The configuration to use for the test
 * @return {TestBuilder}  An instance of this
 */

/**
 * Builds an instance of a Test
 * 
 * @function
 * @name  TestBuilder@build
 * @return {Test} A new instance of a Test built based on the information in this builder
 */