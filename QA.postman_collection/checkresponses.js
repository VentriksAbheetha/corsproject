//This file checks the responses of License module currently
// Run this file with the command "node .\checkresponses.js". Make sure to be under 'QA.postman_collection' directory before running.
//Running this file will log the status of the APIs true/false

import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";


const authToken = signinCORSrequest();
function cors() {

    let qaurl = 'https://qa.ventriksapi2.com'
    let replaceString = '{{qaurl}}'
    for (let i = 0; i < qaAPIS.item.length; i++) {
            for (let j = 0; j < qaAPIS.item[i].item.length; j++) {


                if(qaAPIS.item[i].name === ("License")){ //Name of the module here can be changed to check the response of other modules

                    const urlText = qaAPIS.item[i].item[j].request.url.raw;

                    let url = urlText.toString().replace(replaceString, qaurl)

                    var method = qaAPIS.item[i].item[j].request.method;
                    APICORSrequest(url, method, authToken);

                }
            }
    }

}

cors();

