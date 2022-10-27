//This file checks the responses of License module currently
// Run this file with the command "node .\license.js". Make sure to be under 'QA.postman_collection' directory before running.
//Running this file will log the status of the APIs true/false

import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest,} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";


let authToken = await signinCORSrequest();


async function cors() {
    let qaurl = 'https://qa.ventriksapi2.com';
    let replaceString = '{{qaurl}}';
    for (let i = 0; i < qaAPIS.item.length; i++) {
        for (let j = 0; j < qaAPIS.item[i].item.length; j++) {
            // console.log(qaAPIS.item[i].item[0].request.url.path[0])
            if (qaAPIS.item[i].name === ("Curve")) { //Name of the module here can be changed to check the response of other modules

                const urlText = qaAPIS.item[i].item[j].request.url.raw;

                let url = urlText.toString().replace(replaceString, qaurl);
                try {

                    const method = qaAPIS.item[i].item[j].request.method;
                    await APICORSrequest(url, method, authToken).then(r => {
                        console.log(r)
                        return r;
                    })
                }
                catch(err){
                    console.log(err);
                }

            }

        }

    }
}



var start = new Date().getTime();

cors()
var end = new Date().getTime();
var time = end - start;
console.log('Execution time: ' + time);