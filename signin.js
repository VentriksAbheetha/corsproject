//This file signs in the user jenkins-warmer to authenticate and authorize the APIs.

import {XMLHttpRequest} from "xmlhttprequest";
import {APICORSrequest, } from "./corstest.js";

export function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        /*The XMLHttpRequest.withCredentials property is a boolean value that indicates whether or not
        cross-site Access-Control requests should be made using credentials such as cookies,
        authorization headers or TLS client certificates. */

        //XHR for Chrome/Firefox/Opera/Safari and IE >= 10
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {
        /*XDomainRequest is the only way of having an XHR that supports CORS in IE8 and 9. At the time of IE8, Microsoft decided to come up
        with their own CORS XHR instead of the standard CORS
        XMLHttpRequest which is now used in IE10. Since IE10, XDomainRequest has been removed*/
        // XDomainRequest for IE <= 9
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported
        xhr = null;
    }
    return xhr;
}

// export function signinCORSrequest(){
//     const url = 'https://qa.ventriksapi2.com/account/signin';
//     const username = 'jenkins-warmer';
//     const password = 'Inverness$1';
//
//     // we want the response from API
//     const xhr = createCORSRequest('PUT', url);
//     if (!xhr) {
//         // log message if CORS is not supported
//         console.log('CORS not supported');
//         return;
//     }
//
//     xhr.onload = function () {
//         if (xhr.readyState === xhr.DONE) {
//             // if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
//                 // console.log('create cors request')
//                 const text = xhr.responseText;
//                 const obj = JSON.parse(text);
//                 const auth = obj.data.idToken;
//                 return auth;
//
//             // }
//
//         }
//
//     };
//
//     xhr.onerror = (e) => {
//         return 'error making the request';
//     };
//
//     // send the request with login credentials
//     xhr.send(`{"username":"${username}", "password":"${password}"}`);
//     return xhr.onload();
//
// }
export const signinCORSrequest =async () => {
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
signinCORSrequest().then((res)=>{
    let value = res;
    return value
})

export const getPromise = async()=>{
    try {
     return await signinCORSrequest()

    } catch (err) {
        console.log(err);
    }
}


