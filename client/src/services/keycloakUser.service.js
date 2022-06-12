import Keycloak from "keycloak-js";
import axios from "axios";

// const _kc = new Keycloak ({
//     url: "http://localhost:8080/",
//     realm: "Q-CV",
//     clientId: "nodejs-microservice",
// });

const _kc = new Keycloak({
    "realm": "Q-CV",
    "url": "http://localhost:8080/",
    "clientId": "nodejs-microservice"
});

const initKeycloak = (onAuthenticatedCallback) => {
    console.log('Initializing Keycloak');
    _kc.init({
        onLoad: 'login-required'
    })
    .then((e) => {
        onAuthenticatedCallback();
    })
};

const getAdminToken = () => {
    const body = {
        "client_id": "admin-cli",
        "client_secret": "9bLBSNMFu8DWp30OOLCmurisCrUugJwz",
        "grant_type": "client_credentials"
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    axios.post('http://localhost:8080/realms/master/protocol/openid-connect/token', body, config)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    });

    // axios.get('http://localhost:5000/getMasterToken')
    // .then(response => {
    //     console.log(response);
    // }).catch(error => {
    //     console.log(error);
    // });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = _kc.token;

const updateToken = (successCallback) => {
    _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
    getAdminToken
};

export default UserService;