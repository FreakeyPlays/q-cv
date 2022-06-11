import Keycloak from "keycloak-js";

// const _kc = new Keycloak ({
//     url: "http://localhost:8080/",
//     realm: "Q-CV",
//     clientId: "nodejs-microservice",
// });

const ADDRESS = process.env.REACT_APP_URL;
console.log(ADDRESS);
const _kc = new Keycloak({
    "realm": "Q-CV",
    "url": "http://" + ADDRESS + ":8080",
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
    updateToken
};

export default UserService;
