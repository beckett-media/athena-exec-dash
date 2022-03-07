import React from "react";
import ReactDOM from "react-dom";
import "./styles/app.sass";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
//amplify
import Amplify  from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
