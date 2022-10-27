
### signin.js
This file signs in the user jenkins-warmer to authenticate and authorize the APIs.

### checkAllResponses.js

This file checks the responses of all modules. 
Run this file with the command "node .\checkAllResponses.js". Make sure to be under 'QA.postman_collection' directory before running.
Running this file will log 
1. The status of the APIs true/false
2. CORS check - true/false
3. Displays the full API URL
4. Displays error message if any

 - Write API logs to log-file.txt 

Command : node checkAllResponses.js > log-file.txt

- Append API logs to log-file.txt 

Command : node checkAllResponses.js >> log-file.txt

- Write API logs to log-file.html

