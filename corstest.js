//This file sets the authorization token so that the apis can be accessed
import { signinCORSrequest} from "./signin.js";
import {XMLHttpRequest} from "xmlhttprequest";
// Step 1 - Signin and get credentials
// Step 2 - If valid user, get the session details (token)
// Step 3  - Check any sample module API to see if it's working (success) or have any errors (CORS or functional errors with http code). Log the response message.
// validate API

/**
 * This function creates an xmlhttprequest (with CORS check) and returns a promise which resolves into the API response
 if the request is successful.
 * @param url
 * @param method
 * @param authToken
 * @returns {Promise<unknown>}
 * @constructor
 */
export async function APICORSrequest(url, method, authToken){
    try {

       return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                /*The XMLHttpRequest.withCredentials property is a boolean value that indicates whether or not
                cross-site Access-Control requests should be made using credentials such as cookies,
                authorization headers or TLS client certificates. */

                //XHR for Chrome/Firefox/Opera/Safari and IE >= 10
                xhr.open(method, url);

                //
            } else if (typeof XDomainRequest != "undefined") {
                //     /*XDomainRequest is the only way of having an XHR that supports CORS in IE8 and 9. At the time of IE8, Microsoft decided to come up
                //     with their own CORS XHR instead of the standard CORS
                //     XMLHttpRequest which is now used in IE10. Since IE10, XDomainRequest has been removed*/
                //     // XDomainRequest for IE <= 9
                xhr = new XDomainRequest();
            } else {
                //     // CORS not supported
                xhr = null;
            }

            if (!xhr) {
                // log message if CORS is not supported
                console.log('CORS not supported');
                return;
            }

            xhr.responseType = 'json';
            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.responseText);
                }
                resolve(xhr.responseText)

            };

           xhr.setRequestHeader("Authorization", "Bearer " + authToken);

            xhr.send();

        });

    }
    catch(err) {
        console.log(err);
    }

}
