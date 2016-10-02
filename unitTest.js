
var TestSuiteFactory = require('./lib/testSuiteFactory.js');

var testSuite = TestSuiteFactory.fromMap(require('./test.json'));

testSuite.runSuite();