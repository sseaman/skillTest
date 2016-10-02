/**
 * @author Sloan Seaman 
 * @copyright 2016 and on
 * @version .1
 * @license https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 */

/**
 * Result Hanlder for a Skill. 
 * 
 * This is equal to the context object that is passed by Lambda to an execution skill
 *
 * @interface
 */

/**
 * Called if the skill completed successfully
 *
 * @function
 * @name  SkillResultHandler#succeed
 * @param {Object} result The result from the Skill
 */

/**
 * Called if the skill completed unsuccessfully
 *
 * @function
 * @name  SkillResultHandler#fail
 * @param {Object} result The result from the Skill
 */