import asyncHandler from "express-async-handler";
import fetch from "node-fetch";
import { apiResponse } from "./response.js";

const BASE_URI = `http://${process.env.KC_URI}:${process.env.KC_PORT}`

async function fetchData(url = "", fetchMethod = "GET", additionalHeaders = {}){
    const DATA = await fetch(url, {
        method: fetchMethod,
        headers: { ...additionalHeaders }
    })
    .then(res => res.json());

    return DATA;
}

async function fetchDataJSON(url = "", data = {}, fetchMethod = "POST", additionalHeaders = {}){
    const DATA = await fetch(url, {
        method: fetchMethod,
        body: JSON.stringify(data),
        headers: { ...additionalHeaders, "Content-type": "application/json" }
    }).then(data => data)

    return DATA;
}

async function fetchDataForm(url = "", data = {}, fetchMethod = "POST", additionalHeaders = {}){
    const DATA = await fetch(url, {
        method: fetchMethod,
        body: new URLSearchParams(data),
        headers: { ...additionalHeaders, "Content-type": "application/x-www-form-urlencoded" }
    })
    .then(res => res.json());

    return DATA;
}

// @desc Get the AccessToken
// @route POST /api/keycloak
// @access Private
const getAccessToken = async (req, res) => {
    const URI = BASE_URI + `/realms/master/protocol/openid-connect/token`;
    const DATA = {
        client_id: "admin-cli",
        client_secret: process.env.KC_CLIENT_SECRET,
        grant_type: "client_credentials"
    };

    return await fetchDataForm(URI, DATA, "POST")
        .then(data => {
            return data.access_token;
        })
        .catch(e => {
            apiResponse(res, false, 400, "Could not retrieve Token");
            throw new Error(e.message);
        });
};

// @desc Create a new User
// @route POST /api/keycloak/user/create
// @access Private
const createKeycloakUser = asyncHandler( async (req, res) => {
    const EMAIL = req.body.email;
    const FIRST_NAME = req.body.firstName;
    const LAST_NAME = req.body.lastName;
    const PASSWORD = req.body.password;
    const MONGODB_UID = req.body.id;
    const GROUP = req.body.isAdmin == true ? "Admins" : "Users"

    if( !EMAIL || !FIRST_NAME || !LAST_NAME ||
        !PASSWORD || !MONGODB_UID || !GROUP){
        apiResponse(res, false, 400, "Required Parameter is missing");
        throw new Error("A required Parameter is missing");
    }

    const URI = BASE_URI + `/admin/realms/Q-CV/users`;
    const DATA = {
        "enabled": true,
        "username": EMAIL,
        "email": EMAIL,
        "firstName": FIRST_NAME,
        "lastName": LAST_NAME,
        "credentials": [
            {
                "type": "password",
                "value": PASSWORD,
                "temporary": true
            }
        ],
        "groups": [
            GROUP
        ],
        "attributes": {
            "MONGODB_UID": [
                MONGODB_UID
            ]
        }
    };
    const HEADER = {
        "Authorization": "Bearer " + await getAccessToken(req, res)
    };

    await fetchDataJSON(URI, DATA, "POST", HEADER)
        .then(data => {
            if(data.status != 201){
                apiResponse(res, false, 400, "Could not create User");
            }else{
                apiResponse(res, true, 201, "Created User", {"kc_uid": data.headers.get("location").split("/")[7]});
            }
        })
        .catch(e => {
            apiResponse(res, false, 400, "Could not create User");
            throw new Error(e.message);
        });
})

// @desc Update a existing User
// @route PUT /api/keycloak/user/update/:id
// @access Private
const updateKeycloakUser = asyncHandler( async (req, res) => {
    const URI = BASE_URI + `/admin/realms/Q-CV/users/` + req.params.id;
    const DATA = req.body.email ? { ...req.body, "username": req.body.email} : req.body;
    const HEADER = {
        "Authorization": "Bearer " + await getAccessToken(req, res)
    };

    fetchDataJSON(URI, DATA, "PUT", HEADER)
        .then(data => {
            if(data.status != 204){
                apiResponse(res, false, 400, "Could not update User");
            }else{
                apiResponse(res, true, 200, "Updated User");
            }
        })
        .catch(e => {
            apiResponse(res, false, 400, e.message);
            throw new Error(e.message);
        });
})

// @desc Give User a Temporary Password
// @route PUT /api/keycloak/user/:id/password/reset
// @access Private
const resetKeycloakPassword = asyncHandler( async (req, res) => {
    const PASSWORD = req.body.password;

    if(!PASSWORD){
        apiResponse(res, false, 404, "Password is missing");
        throw new Error("Password is missing");
    }

    const URI = BASE_URI + `/admin/realms/Q-CV/users/` + req.params.id + `/reset-password`;
    const DATA = {
            "type": "password",
            "value": PASSWORD,
            "temporary": true
        };
    const HEADER = {
        "Authorization": "Bearer " + await getAccessToken(req, res)
    };

    fetchDataJSON(URI, DATA, "PUT", HEADER)
        .then(data =>{
            if(data.status != 204){
                apiResponse(res, false, 400, "Could not create Temporary Password");
            }else{
                apiResponse(res, true, 200, "Updated User Password");
            }
        })
        .catch(e => {
            apiResponse(res, false, 400, "Could not create Temporary Password");
            throw new Error(e.message);
        });
})

// @desc Delete a existing User
// @route DELETE /api/keycloak/user/delete/:id
// @access Private
const deleteKeycloakUser = asyncHandler( async (req, res) => {
    const URI = BASE_URI + `/admin/realms/Q-CV/users/` + req.params.id;
    const HEADER = {
        "Authorization": "Bearer " + await getAccessToken(req, res)
    };

    fetchDataJSON(URI, {}, "DELETE", HEADER)
        .then(data =>{
            if(data.status != 204){
                apiResponse(res, false, 400, "Could not Delete User");
            }else{
                apiResponse(res, true, 200, "Deleted User");
            }
        })
        .catch(e => {
            apiResponse(res, false, 400, e.message);
            throw new Error(e.message);
        });
})

// @desc Get a User
// @route GET /api/keycloak/user/:id
// @access Private
const getKeycloakUser = asyncHandler( async (req, res) => {
    const URI = BASE_URI + `/admin/realms/Q-CV/users/` + req.params.id;
    const HEADER = {
        "Authorization": "Bearer " + await getAccessToken(req, res)
    };

    fetchData(URI, "GET", HEADER)
        .then(data => {
            if(data.error){
                apiResponse(res, false, 400, "Could not Find or Return User");
            }else{
                apiResponse(res, true, 200, "Returned User", data);
            }
        })
        .catch(e => {
            apiResponse(res, false, 400, e.message);
            throw new Error(e.message);
        });
})

export {
    createKeycloakUser,
    updateKeycloakUser,
    resetKeycloakPassword,
    deleteKeycloakUser,
    getKeycloakUser
}