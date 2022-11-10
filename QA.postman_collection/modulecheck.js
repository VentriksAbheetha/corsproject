
import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest,} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";
import {fileURLToPath} from "url";

const timestamp = Date.now();

const dateObject = new Date(timestamp);

const time = dateObject.toLocaleString();
const time2 = dateObject.toLocaleTimeString();

let authToken = await signinCORSrequest();

console.log( `${time}` + "MEHMEHMEHMEH");

/**
 * Takes the name of the module as a parameter and prints the API responses of that particular module
 * @param module
 * @returns {Promise<*[]>}
 */

export async function cors(module) {

    let logs = [];

    let qaurl = 'https://qa.ventriksapi2.com';
    let replaceString = '{{qaurl}}';
    for (let i = 0; i < qaAPIS.item.length; i++) {
        for (let j = 0; j < qaAPIS.item[i].item.length; j++) {
            // console.log(qaAPIS.item[i].item[0].request.url.path[0])
            if (qaAPIS.item[i].name === (module) || module === undefined) { //Name of the module here can be changed to check the response of other modules

                const urlText = qaAPIS.item[i].item[j].request.url.raw;

                let url = urlText.toString().replace(replaceString, qaurl);
                try {
                    const method = qaAPIS.item[i].item[j].request.method;
                      await APICORSrequest(url, method, authToken).then(r => {
                          // logs.push({apiName:qaAPIS.item[i].item[j].name, urlName: url, statusCheck : JSON.parse(r).status })
                        logs.push("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status)

                         // console.log(r);
                        // logs[j].push("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status)
                        console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status )
                        // return r;
                    })

                }
                catch(err){
                    // console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)
                    logs.push("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)

                }

            }
            else{

            }

        }



    }
    return logs;

}


// async function call() {
//     return await cors('License').then(r =>{
//         return r;
//     })
// }
// call();
// console.log(call() + "this");

// function mod() {
//     let result = cors('License');
//     console.log("Check")
//     document.getElementById('logs').innerText = "might work"
// }
//
// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename)
