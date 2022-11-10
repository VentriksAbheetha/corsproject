import fetch from "node-fetch";
fetch('/logs', {
    method: 'GET', // or 'PUT'

})
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });