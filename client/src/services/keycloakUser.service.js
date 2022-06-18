import Keycloak from "keycloak-js";
import axios from "axios";

// const _kc = new Keycloak ({
//     url: "http://localhost:8080/",
//     realm: "Q-CV",
//     clientId: "nodejs-microservice",
// });

const ADDRESS = process.env.REACT_APP_URL;
const PORT = process.env.REACT_APP_API_PORT;
const basePath = "http://" + ADDRESS + ":" + PORT + "/api/keycloak/user";

const _kc = new Keycloak({
    "realm": "Q-CV",
    "url": "http://" + ADDRESS + ":8080",
    "clientId": "nodejs-microservice",
    "enable-cors": true
});

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'login-required'
    })
    .then((e) => {
        onAuthenticatedCallback();
    })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = _kc.token;

const updateToken = (successCallback) => {
    _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

const getKCUID = () => _kc.tokenParsed.sub;

const getKCName = () => _kc.tokenParsed.name;

const createKeycloakUser = (data) => {
    return axios.post(basePath + "/create", data);
}

const updateKeycloakUser = (id, data) => {
    return axios.put(basePath + "/update/" + id, data);
}

const resetKeycloakPassword = (id, data) => {
    return axios.put(basePath + "/" + id + "/password/reset", data);
}

const deleteKeycloakUser = (id) => {
    return axios.delete(basePath + "/delete/" + id);
}

const getKeycloakUser = (id) => {
    return axios.get(basePath + "/" + id);
}

const getLoggedInUID = () => {
    return axios.get(basePath + "/" + getKCUID())
    .then(res => res.data.response.attributes.MONGODB_UID[0])
    .catch(e => console.log(e));
}

const getIsAdmin = () => {
    const role = _kc.tokenParsed.resource_access["nodejs-microservice"].roles[0];

    return role === "admin" ? true : false;
}

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
    getKCName,
    createKeycloakUser,
    updateKeycloakUser,
    resetKeycloakPassword,
    deleteKeycloakUser,
    getKeycloakUser,
    getLoggedInUID,
    getIsAdmin
};

export default UserService;