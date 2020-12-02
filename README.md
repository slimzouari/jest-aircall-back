//////////////////////////////Assignment\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Link to Test Plan

/////////////////////////////Test Framework Setup Readme \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Pre-requistes:
install node version 12.xx (recommended) or higher


# clone projects :
git clone https://github.com/edcast/leapest-integration-framework.git

# Steps to Setup the project:
- from the root folder of the project 
- execute the following cmd from the terminal: npm install

# Steps to execute the tests:

- from the root folder of the project: execute the following cmd: **npm test**
- to run the test under stage environment for example, run the following cmd: **NODE_ENV=stage && npm test**

# Repository Structure

- configuration files :
	 - env.config.js : environment specific configuration used to load enviroment data depending on NODE_ENV environment variable, default value is test
	 - jest.config.js : global jest configuration
	 - package.json : contains npm project configuration and dependecies

- env setup files:
	- run some code to configure or set up the testing framework before each test (example setup test dabaase ...)

- tests :
	- __snapshot__ : generated snap files used during by the test framework for assertions
	- *.test.js files : test case definition
	- suite.test.js : test file to be invoked when running npm test
	
- data :
	- api.aircall.metadata : files contains list of all json apis under test metadata
		- api config 1
		- api config 2 ...
	for any other provider, add a different metadata file, for integration apis, add another file api.integration.provider-name.metadata
	- test.data Folder
		- suite 1 test data
		- suite 2 test data ...
	- test.data.js : file to import in the test files

- helpers:
	- utility files to support in the testing activities

# API Definition Structure
-	All the APIs are defined under ./data/api.metadata files
-	An API is defined by the following properties :
	-	base_url : API Base Url (https://api.aircall.io/v1/)
	-	url : API endpoint (/contacts/search)
	-	method : Get - Post ...
	-	authorization : Authorization Key : could be basic/ Bearer ...
	-	extra : for future use cases : capture extra meta data (headers, default params, default body ...)
		- extra.headers
		- extra.params (default params for get request)
		- extra.body (default body)
		- extra.response.dynamicFields
		- extra.response.generateFields : to generate some fields

# Test Data Structure and Tests:
- By Convention, one test file is mapped to one test data file
	- For example, for a test file named : contact.search.test.js there is a test data file called contact.search.data.json
- a jest test is mapped to test data, test data could be within data_provider (in case of multiple scneario) object or within input object (in case of single test)
- for testing get request, a data_provider (or input) contains basically different valuse for the query parameters
- for testing post request, a data_provider (or input) contains the post data

# Test Report
- the framework uses jest-html-reporter.
- by the end of the test, test-report.html file is generated



# How to Add a new Test case :
- API Definition : is the api defined in ./data/api.*.metadata.js file?
	- Yes : do nothing
	- No : add the new api

- Test Data Definition : assuming that test case have been already designed:
	- add test data : go to test.data and add a new json file.
	- import your test data in test.data.js file

- Test Case Definition :
	- add new file for the new test case.
	- write the new test case
	- if you opt for snapshot assertion strategy in your test case, verify that the new snapshot is generated and validate the result.	