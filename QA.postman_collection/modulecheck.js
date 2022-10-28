
import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest,} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";


const timestamp = Date.now();

const dateObject = new Date(timestamp);

const time = dateObject.toLocaleString();
const time2 = dateObject.toLocaleTimeString();

let authToken = await signinCORSrequest();

console.log( `${time}` );

/**
 * Takes the name of the module as a parameter and prints the API responses of that particular module
 * @param module
 * @returns {Promise<void>}
 */
export async function cors(module) {
    let qaurl = 'https://qa.ventriksapi2.com';
    let replaceString = '{{qaurl}}';
    for (let i = 0; i < qaAPIS.item.length; i++) {
        for (let j = 0; j < qaAPIS.item[i].item.length; j++) {
            // console.log(qaAPIS.item[i].item[0].request.url.path[0])
            if (qaAPIS.item[i].name === (`${module}`)) { //Name of the module here can be changed to check the response of other modules

                const urlText = qaAPIS.item[i].item[j].request.url.raw;

                let url = urlText.toString().replace(replaceString, qaurl);
                try {
                    const method = qaAPIS.item[i].item[j].request.method;
                    await APICORSrequest(url, method, authToken).then(r => {
                        console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status )
                        return r;
                    })
                }
                catch(err){
                    console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)

                }

            }

        }

    }
}


cors();
