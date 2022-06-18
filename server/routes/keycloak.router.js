import express from "express";
import {
    createKeycloakUser,
    updateKeycloakUser,
    resetKeycloakPassword,
    deleteKeycloakUser,
    getKeycloakUser
} from "../controllers/keycloak.controller.js"

const keycloakRouter = express.Router();
const keycloakRoute = '/user';

keycloakRouter.route(keycloakRoute + "/:id").get(getKeycloakUser);
keycloakRouter.route(keycloakRoute + "/create").post(createKeycloakUser);
keycloakRouter.route(keycloakRoute + "/update/:id").put(updateKeycloakUser);
keycloakRouter.route(keycloakRoute + "/delete/:id").delete(deleteKeycloakUser);
keycloakRouter.route(keycloakRoute + "/:id/password/reset").put(resetKeycloakPassword);

export default keycloakRouter;