
import {XMLHttpRequest} from "xmlhttprequest";
import {fileURLToPath} from "url";

/**
 * This function signs in the user jenkins-warmer
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

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
