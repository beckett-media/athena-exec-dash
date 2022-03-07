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
import { Authenticator, Heading, useTheme, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  const components = {
    VerifyUser: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },

    ConfirmVerifyUser: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };

  return (
    <>
      <Authenticator components={components} hideSignUp={false}>
        {({ signOut, user }) => (
          <Routes>
            <Route path="/" element={<Page title="Website Metrics 👩🏻‍💻" desc="Track Beckett's website behavior for all your online marketing efforts" />}>
              <Route index element={<WebsiteMediaMetric />} />
            </Route>
            <Route
              path="dashboard"
              element={<Page title="Card Market Analysis 📈" />}
            >
              <Route
                path="/dashboard/market-analysis"
                element={<MarketAnalysis />}
              />
            </Route>
            <Route
              path="dashboard"
              element={<Page title="Comics Market Analysis 💥" />}
            >
              <Route
                path="/dashboard/comic-market-analysis"
                element={<ComicAnalysis />}
              />
            </Route>
            <Route
              path="dashboard"
              element={<Page title="World Domination Index 🌎" />}
            >
              <Route
                path="/dashboard/social-media-analysis"
                element={<SocialMediaMetric />}
              />
            </Route>
            <Route
              path="dashboard"
              element={<Page title="Grading Score Cards ☕️" />}
            >
              <Route path="/dashboard/web-analysis" element={<Home />} />
            </Route>
          </Routes>
        )}
      </Authenticator>
    </>
  );
}

export default App;
