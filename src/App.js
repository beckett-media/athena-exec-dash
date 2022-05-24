import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Authenticator, Heading, View, Image } from "@aws-amplify/ui-react";
import { Text } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import "@aws-amplify/ui-react/styles.css";
import "./styles/app.sass";
import "./utils-auth/auth.css";
import { compareArrays } from "./utils";
import { graderData } from "./mocks/cardsByGrader";

//Screen
import Page from "./components/Page";
import Home from "./screens/Home";
import SocialMediaMetric from "./screens/SocialMediaMetric";
import MarketAnalysis from "./screens/CardMarketAnalysis";
import ComicAnalysis from "./screens/ComicsAnalysis";
import UpdateData from "./screens/UpdatesCardGraded";
import FinancialPerformance from "./screens/FinancialPerformance/FinancialPerformance";
import ROIPerformance from "./screens/ROIPerformance/ROIPerformance";
import WebsiteMediaMetric from "./screens/WebsiteTraffic";
import NoMatch from "./screens/NoMatch";
import chat from "./components/LottieAnimation/chat.json";
import OpsPerformance from "./screens/OpsPerformance";
import Settings from "./screens/Settings/Settings";
import GradingSettings from "./screens/GradingSettings/GradingSettings";
import { useApiData } from "./providers/apiData";
import { API } from "aws-amplify";

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

const apiName = "palentirApi";
const fetcher = (path) =>
  API.get(apiName, path).then((response) => response.data);

function App() {
  const {
    dataTable,
    socialDataIndicators,
    socialData,
    socialDataMessage,
    comicIndexing,
  } = useApiData();

  const checkPermission = (user, array) => {
    if (user.signInUserSession.idToken.payload["cognito:groups"]) {
      const userPermissions =
        user.signInUserSession.idToken.payload["cognito:groups"];
      return compareArrays(userPermissions, array);
    } else {
      return false;
    }
  };

  return (
    <SWRConfig value={{ fetcher }}>
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
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624367ac5b97b001187139af_shubham-dhage-nOkWMjfMhnc-unsplash.jpeg"
                  }
                  // globes={globejson}
                  color={"black"}
                  textColor={"#fff"}
                  user={user}
                  signOut={signOut}
                  title="Website Metrics"
                  desc="Track Beckett's website behavior."
                />
              }
            >
              <Route index element={<WebsiteMediaMetric />} />
            </Route>
            <Route
              path="dashboard"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624367280ba6d5b1b329e35a_shubham-dhage-L31Bz7I0sA0-unsplash.jpeg"
                  }
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="Card Market"
                />
              }
            >
              <Route
                path="/dashboard/market-analysis"
                element={<MarketAnalysis data={dataTable} />}
              />
            </Route>
            <Route
              path="dashboard"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624364035c537c6b45a0c06e_shubham-dhage-AeF5ZV1LRRE-unsplash.jpeg"
                  }
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="Comics Market"
                />
              }
            >
              <Route
                path="/dashboard/comic-market-analysis"
                element={<ComicAnalysis dataCI={comicIndexing} />}
              />
            </Route>
            <Route
              path="dashboard"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624367aa59d48e73ae929f41_shubham-dhage-dPgoXjFoxk4-unsplash.jpeg"
                  }
                  globe={chat}
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="World Domination Index 🌎"
                />
              }
            >
              <Route
                path="/dashboard/social-media-analysis"
                element={
                  <SocialMediaMetric
                    dataI={socialDataIndicators}
                    socialData={socialData}
                    socialMessage={socialDataMessage}
                  />
                }
              />
            </Route>
            <Route
              path="dashboard"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/6260371216f5871ab6f799f4_financial.jpeg"
                  }
                  globe={chat}
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="Operations Performance"
                />
              }
            >
              <Route
                path="/dashboard/ops-performance"
                element={<OpsPerformance />}
              />
            </Route>
            {checkPermission(user, ["financial", "admin", "dev"]) && (
              <Route
                path="financial"
                element={
                  <Page
                    imgBg={
                      "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/62435e4726cb4698ebafca80_sebastian-svenson-d2w-_1LJioQ-unsplash.jpeg"
                    }
                    globe={chat}
                    color={"black"}
                    textColor={"#fff"}
                    signOut={signOut}
                    user={user}
                    title="Financial Performance"
                  />
                }
              >
                <Route
                  path="/financial/financial-performance"
                  element={<FinancialPerformance />}
                />
              </Route>
            )}
            {checkPermission(user, ["financial", "dev", "admin"]) && (
              <Route
                path="financial"
                element={
                  <Page
                    imgBg={
                      "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/62435e4726cb4698ebafca80_sebastian-svenson-d2w-_1LJioQ-unsplash.jpeg"
                    }
                    globe={chat}
                    color={"black"}
                    textColor={"#fff"}
                    signOut={signOut}
                    user={user}
                    title="ROI Performance"
                  />
                }
              >
                <Route
                  path="/financial/roi-performance"
                  element={<ROIPerformance />}
                />
              </Route>
            )}
            <Route
              path="grading"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624368f205c22422f5fd98e6_shubham-dhage-fQL1DKNUQZw-unsplash.jpeg"
                  }
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="Grading Score Cards"
                />
              }
            >
              <Route path="/grading/web-analysis" element={<Home />} />
            </Route>
            {checkPermission(user, ["grading", "dev", "admin"]) && (
              <Route
                path="grading"
                element={
                  <Page
                    imgBg={
                      "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/62435e4726cb4698ebafca80_sebastian-svenson-d2w-_1LJioQ-unsplash.jpeg"
                    }
                    globe={chat}
                    color={"black"}
                    textColor={"#fff"}
                    signOut={signOut}
                    user={user}
                    title="Update Productivity Records"
                  />
                }
              >
                <Route
                  path="/grading/grading-update-data"
                  element={<UpdateData />}
                />
              </Route>
            )}
            {checkPermission(user, ["grading", "dev", "admin"]) && (
              <Route
                path="grading"
                element={
                  <Page
                    imgBg={
                      "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624368f205c22422f5fd98e6_shubham-dhage-fQL1DKNUQZw-unsplash.jpeg"
                    }
                    color={"black"}
                    textColor={"#fff"}
                    signOut={signOut}
                    user={user}
                    title="Grading Settings"
                  />
                }
              >
                <Route
                  path="/grading/grading-settings"
                  element={<GradingSettings dataCI={graderData} />}
                />
              </Route>
            )}
            <Route
              path="/"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624368f205c22422f5fd98e6_shubham-dhage-fQL1DKNUQZw-unsplash.jpeg"
                  }
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  user={user}
                  title="Settings"
                />
              }
            >
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route
              path="dashboard"
              element={
                <Page
                  imgBg={
                    "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624368f205c22422f5fd98e6_shubham-dhage-fQL1DKNUQZw-unsplash.jpeg"
                  }
                  color={"black"}
                  textColor={"#fff"}
                  signOut={signOut}
                  itr
                  user={user}
                  title="Not Found"
                />
              }
            >
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        )}
      </Authenticator>
    </SWRConfig>
  );
}

export default App;
