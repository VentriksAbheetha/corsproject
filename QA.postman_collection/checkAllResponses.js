import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest,} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";

let authToken = await signinCORSrequest();

const timestamp = Date.now();

const dateObject = new Date(timestamp);

const time = dateObject.toLocaleString();
const time2 = dateObject.toLocaleTimeString();

console.log( `${time}` + "BLAHBLAH BLAHBLAH")

/**
 * This function checks all APIs and returns the formatted API response and prints it to the console.
 * If there are errors it catches the errors and prints the error message to the console.
 * @returns {Promise<void>}
 */
export async function corsAll() {
    let logs = [];
    let qaurl = 'https://qa.ventriksapi2.com';
    let replaceString = '{{qaurl}}';
    for (let i = 0; i < qaAPIS.item.length; i++) {
        for (let j = 0; j < qaAPIS.item[i].item.length; j++) {

                const urlText = qaAPIS.item[i].item[j].request.url.raw;
                let url = urlText.toString().replace(replaceString, qaurl);

                // const method = qaAPIS.item[i].item[j].request.method;
                try {
                    const method = qaAPIS.item[i].item[j].request.method;

                    await APICORSrequest(url, method, authToken).then(r => {

                        logs.push({apiName:qaAPIS.item[i].item[j].name, urlName: url, statusCheck : JSON.parse(r).status })

                        // logs.push("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status)

                        console.log("........[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status)

                        return r;
                    })
                }
                catch(err) {
                    logs.push("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)

                    console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)
                }
        }

    }
}

corsAll().then(r=>{
    console.log(r);
}).catch((e)=>{
    throw e;
})


