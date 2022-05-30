import React from "react";
import { createRoot } from "react-dom/client";
import UserService from "./services/user.service";
import HttpService from "./services/http.service";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

const renderApp = () => root.render(<App />);

UserService.initKeycloak(renderApp);
HttpService.configure();