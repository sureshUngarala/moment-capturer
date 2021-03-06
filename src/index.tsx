import React from "react";
import ReactDOM from "react-dom";
import { Amplify } from "@aws-amplify/core";

import App from "./App";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import awsconfig from "./aws-exports";
import { swEventName } from "./utils/constants";

Amplify.configure(awsconfig);

ReactDOM.render(<App />, document.getElementById("root"));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    document.dispatchEvent(new CustomEvent(swEventName, { detail: "update" }));
    document.addEventListener(swEventName, ((event: CustomEvent) => {
      if (event.detail === "proceed-update") {
        registration.waiting?.postMessage({ type: "SKIP_WAITING" });
      }
      window.location.reload();
    }) as EventListener);
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    document.dispatchEvent(new CustomEvent(swEventName, { detail: "success" }));
  },
});
