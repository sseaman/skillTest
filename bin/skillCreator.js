
var prompt = require('prompt');

var testSchema = {
	properties : {
		global		: {
			description	: 'Is there a global file',
			type 		: 'boolean',
			required	: false,
			default		: 'f'
		},
		globalFile	: {
			description	: 'Global file to use',
			type 		: 'string',
			required	: true,
			default		: './globals.json'
			ask 	: function() {
	          return prompt.history('global').value > 0;
	        }
		},
		testName 	: {
			description : 'Name of your test',
			type		: 'string',
			message		: 'Every test must have a name',
			required	: true
		},
		intentName 	: {
			description : 'Name of the intent to execute',
			type		: 'string',
			message		: 'Every test must have an intent to execute',
			required	: true,
		},
		intentType 	: {
			description	: 'Type of intent to execute. (I)ntent, (L)aunch, (S)essionEnd, or (O)ther' ,
			type 		: 'string',
			pattern		: '/(I|i|L|l|S|S|O|o)/',
			message		: 'Intent type required',
			required	: true,
			default		: 'I'
		},
		intentSlots : {
			description	: 'Does the intent have slots',
			type		: 'boolean',
			default		: 'f'
		},
		workingDir 	: {
			description	: 'Root directory of skill to test',
			type		: 'string',
			message		: 'The framework needs to know where to execute',
			default		: '.',
			required	: true
		},
		entryPoint	: {
			description	: 'Entry point for the skill',
			type		: 'string',
			message		: 'The skill main object execute is required',
			default		: 'index.js',
			required	: true
		}

	}
}

prompt.message = "SkillCreator";

prompt.start();

prompt.get(testSchema, function(err, result) {

});