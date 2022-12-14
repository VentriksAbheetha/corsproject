import express, {query} from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {cors} from "./modulecheck.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name', __dirname);
// const __dirname2 = path.dirname("C:\\Users\\AbeethaPradhan\\corsproject\\QA.postman_collection\\modulecheck.js"

// const __dirname3 = path.dirname("C:\\Users\\AbeethaPradhan\\corsproject")
console.log(__dirname)
let PORT = 5000;
// console.log(path.join(__dirname, '/log-file.html' ));
// app.use(express.static('corsproject/QA.postman_collection'))
app.get("/", async function (req, res) {
    // try {
    //     let logs = await cors('License');
    //     // console.log(logs);
    //
    //     res.send(logs);
    // }
    // catch (e){
    //     // console.log(e);
    // }
    res.sendFile(__dirname + "/log-file.html");
});

    app.get("/api/logs/:module", async function (req, res) {
        // let logs = cors('Rules')
            try {
                let logs = await cors(req.params.module);
                // console.log(logs);
                res.send(logs);
            }
            catch (e){
                // console.log(e);
            }


    });

app.get("/logs/:module", function (req, res) {
    // let logs = cors('Rules')

    res.sendFile(__dirname + "/log-file.html");


});

app.use(express.static(path.join("C:\\Users\\AbeethaPradhan\\corsproject\\QA", '\\QA.postman_collection' )));


// app.use('/static', express.static());

app.listen(PORT, function () {
    console.log("Server is running on localhost", PORT);
});
