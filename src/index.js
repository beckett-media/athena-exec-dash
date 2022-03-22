import React from "react";
import ReactDOM from "react-dom";
import "./styles/app.sass";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AmplifyProvider } from "@aws-amplify/ui-react";
//amplify
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    </ChakraProvider>
  </BrowserRouter>
);
