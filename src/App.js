import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/app.sass";

//Screen
import Page from "./components/Page";
import Home from "./screens/Home";
import SocialMediaMetric from "./screens/SocialMediaMetric";
import MarketAnalysis from "./screens/CardMarketAnalysis";
import ComicAnalysis from "./screens/ComicsAnalysis";
import WebsiteMediaMetric from "./screens/WebsiteTraffic";
import { Authenticator, Heading, View, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Text } from "@chakra-ui/react";
import "./utils-auth/auth.css";

const components = {
  Header() {
    return (
      <View textAlign="center" style={{ marginBotton: 20 }}>
        <Image
          alt="Beckett media logo"
          src={require("./utils-auth/Beckett-Logo-Full-Wordmark-White-LG.png")}
        />
      </View>
    );
  },

  Footer() {
    return (
      <View textAlign="center" marginTop="20px">
        <Text>&copy; 2022 Beckett Media All Rights Reserved</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      return (
        <Heading style={{ marginTop: 30 }} textAlign={"center"} level={4}>
          Sign in to your account
        </Heading>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      placeholder: "Email",
      isRequired: true,
      label: "Email:",
    },
    password: {
      labelHidden: false,
      placeholder: "Password",
      isRequired: true,
      label: "Password:",
    },
  },
};

function App() {
  return (
    <Authenticator
      hideSignUp={true}
      components={components}
      formFields={formFields}
    >
      {({ signOut, user }) => (
        <Routes>
          <Route
            path="/"
            element={
              <Page
                user={user}
                signOut={signOut}
                title="Website Metrics  👩🏻‍💻"
                desc="Track Beckett's website behavior for all your online marketing efforts"
              />
            }
          >
            <Route index element={<WebsiteMediaMetric />} />
          </Route>
          <Route
            path="dashboard"
            element={
              <Page
                signOut={signOut}
                user={user}
                title="Card Market Analysis 📈"
              />
            }
          >
            <Route
              path="/dashboard/market-analysis"
              element={<MarketAnalysis />}
            />
          </Route>
          <Route
            path="dashboard"
            element={
              <Page
                signOut={signOut}
                user={user}
                title="Comics Market Analysis 💥"
              />
            }
          >
            <Route
              path="/dashboard/comic-market-analysis"
              element={<ComicAnalysis />}
            />
          </Route>
          <Route
            path="dashboard"
            element={
              <Page
                signOut={signOut}
                user={user}
                title="World Domination Index 🌎"
              />
            }
          >
            <Route
              path="/dashboard/social-media-analysis"
              element={<SocialMediaMetric />}
            />
          </Route>
          <Route
            path="dashboard"
            element={
              <Page
                signOut={signOut}
                user={user}
                title="Grading Score Cards ☕️"
              />
            }
          >
            <Route path="/dashboard/web-analysis" element={<Home />} />
          </Route>
        </Routes>
      )}
    </Authenticator>
  );
}

export default App;
