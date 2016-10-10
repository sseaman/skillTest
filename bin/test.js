

var str = '"workingDirectory" 	: "{{executorWorkingDirectory}}"';

console.log( str.replace("{{executorWorkingDirectory}}", "test") );