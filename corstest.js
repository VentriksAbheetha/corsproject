//This file sets the authorization token so that the apis can be accessed

import {createCORSRequest, signinCORSrequest} from "./signin.js";
// Step 1 - Signin and get credentials
// Step 2 - If valid user, get the session details (token)
// Step 3  - Check any sample module API to see if it's working (success) or have any errors (CORS or functional errors with http code). Log the response message.
// validate API

export function APICORSrequest(url, method, authToken){
    // const authToken = signinCORSrequest();
    // we want the response from API
    // const authToken = signinCORSrequest();

    const xhr = createCORSRequest(method, url);

    if (!xhr) {
        // log message if CORS is not supported
        console.log('CORS not supported');
        return;
    }
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if  (xhr.status === 200) {
                const text = xhr.responseText;
                const obj = JSON.parse(text)
                console.log('response from request to ' + url + " " + obj.status );

            }

        }

    };

    xhr.onerror = function () {
        return 'error making the request';
    };

    // send the request
    xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    xhr.send();

}


