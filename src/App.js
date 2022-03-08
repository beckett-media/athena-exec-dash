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
import {
  Authenticator,
  Heading,
  useTheme,
  Theme,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Image, Text, Button } from "@chakra-ui/react";

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },
};

function App() {
  return (
    <Authenticator hideSignUp={true}>
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
