import qaAPIS from '../QA.postman_collection.js'
import {APICORSrequest,} from "../corstest.js";
import {signinCORSrequest} from "../signin.js";

let authToken = await signinCORSrequest();

/**
 *
 * @returns {Promise<void>}
 */
// current timestamp in milliseconds
const timestamp = Date.now();

const dateObject = new Date(timestamp);

const time = dateObject.toLocaleString();
const time2 = dateObject.toLocaleTimeString();

// prints date & time in YYYY-MM-DD format
console.log( `${time}` );
async function cors() {
    let qaurl = 'https://qa.ventriksapi2.com';
    let replaceString = '{{qaurl}}';
    for (let i = 1; i < qaAPIS.item.length; i++) {
        for (let j = 0; j < qaAPIS.item[i].item.length; j++) {
            // console.log(qaAPIS.item[i].item[0].request.url.path[0])
            // if (qaAPIS.item[i].name === ("License")) { //Name of the module here can be changed to check the response of other modules
            //     console.log(qaAPIS.item[1].item[1].request.url.raw);
                const urlText = qaAPIS.item[i].item[j].request.url.raw;
                let url = urlText.toString().replace(replaceString, qaurl);

                const method = qaAPIS.item[i].item[j].request.method;
                try {
                    await APICORSrequest(url, method, authToken).then(r => {
                        console.log("[" + time2 + "]" + " " + qaAPIS.item[i].item[j].name + " " + url + " " + "CORS Check=Success" + " " + "status="+ JSON.parse(r).status )
                        return r;
                    })
                }
                catch(err) {
                    console.log(qaAPIS.item[i].item[j].name + " " + url + " " + "ERROR" +  err)
                }
            // }

        }

    }
}

cors().then(r=>{
    console.log(r);
}).catch((e)=>{
    throw e;
})


