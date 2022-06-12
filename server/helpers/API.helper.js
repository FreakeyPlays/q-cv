// const request = require('request');
import request from "request";

const request_POST = () => {
    const data = {
        client_id: "admin-cli",
        client_secret: "9bLBSNMFu8DWp30OOLCmurisCrUugJwz",
        grant_type: "client_credentials"
    };

    request.post({url: 'http://localhost:8080/realms/master/protocol/openid-connect/token', form: data}, function callback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed: ', err);
        }
        console.log('upload successful: ', body);
    });
};

const APIHelper = {
    request_POST
};

export default APIHelper;