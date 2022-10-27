//This file signs in the user jenkins-warmer to authenticate and authorize the APIs.

import {XMLHttpRequest} from "xmlhttprequest";
import {APICORSrequest, } from "./corstest.js";

// export function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//         /*The XMLHttpRequest.withCredentials property is a boolean value that indicates whether or not
//         cross-site Access-Control requests should be made using credentials such as cookies,
//         authorization headers or TLS client certificates. */
//
//         //XHR for Chrome/Firefox/Opera/Safari and IE >= 10
//         xhr.open(method, url, true);
//
//     } else if (typeof XDomainRequest != "undefined") {
//         /*XDomainRequest is the only way of having an XHR that supports CORS in IE8 and 9. At the time of IE8, Microsoft decided to come up
//         with their own CORS XHR instead of the standard CORS
//         XMLHttpRequest which is now used in IE10. Since IE10, XDomainRequest has been removed*/
//         // XDomainRequest for IE <= 9
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//         // CORS not supported
//         xhr = null;
//     }
//     return xhr;
// }
/**
 *
 * @returns {Promise<unknown>}
 */
export const signinCORSrequest = async () => {
    const username = 'jenkins-warmer';
    const password = 'Inverness$1';
    const url = 'https://qa.ventriksapi2.com/account/signin';
    const method = 'PUT';
       return new Promise(async(resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 400) {
               reject(xhr.responseText);
            }
            resolve(JSON.parse(xhr.responseText).data.idToken)
        };

        xhr.send(`{"username":"${username}", "password":"${password}"}`);
    })
};

/**
 *
 */
signinCORSrequest().then((res)=>{
    let value = res;
    return value
})

// export const getPromise = async()=>{
//     try {
//      return await signinCORSrequest()
//
//     } catch (err) {
//         console.log(err);
//     }
// }