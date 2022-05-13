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
import { ApiDataProvider } from "./providers/apiData";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AmplifyProvider>
          <ApiDataProvider>
            <App />
          </ApiDataProvider>
        </AmplifyProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
