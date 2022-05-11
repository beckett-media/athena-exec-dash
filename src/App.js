import React from "react";
import { Routes, Route } from "react-router-dom";
import AWS from "aws-sdk";
import { API, Auth } from "aws-amplify";
import { Authenticator, Heading, View, Image } from "@aws-amplify/ui-react";
import { Text } from "@chakra-ui/react";

import "@aws-amplify/ui-react/styles.css";
import "./styles/app.sass";
import "./utils-auth/auth.css";

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
  const [dataTable, setDataTable] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [trafficData, setTrafficData] = React.useState([]);
  const [deviceData, setDeviceData] = React.useState([]);
  const [countriesData, setCountriesData] = React.useState([]);
  const [pagesData, setPagesData] = React.useState([]);
  const [socialDataIndicators, setSocialDataIndicators] = React.useState([]);
  const [socialData, setSocialData] = React.useState([]);
  const [socialDataMessage, setSocialDataMessage] = React.useState([]);
  const [comicIndexing, setComicIndexing] = React.useState([]);
  const [status, setstatus] = React.useState(0);
  const [allUsers, setUsers] = React.useState([]);

  const getUsers = async () => {
    try {
      let allUsers = [];
      let more = true;
      let paginationToken = "";

      while (more) {
        let params = {
          UserPoolId: "us-west-1_7eDAf5I2X", // process.env.REACT_APP_USER_POOL_ID,
          Limit: 60,
        };
        if (paginationToken !== "") {
          params.PaginationToken = paginationToken;
        }

        AWS.config.update({
          region: "us-west-1", //process.env.REACT_APP_USER_POOL_REGION,
          accessKeyId: "AKIAX7KA2GYFDAL4SMBH", //process.env.REACT_APP_ACCESS_KEY_ID,
          secretAccessKey: "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", //process.env.REACT_APP_SECRET_KEY
        });
        const cognito = new AWS.CognitoIdentityServiceProvider();
        const rawUsers = await cognito.listUsers(params).promise();
        allUsers = allUsers.concat(rawUsers.Users);
        if (rawUsers.PaginationToken) {
          paginationToken = rawUsers.PaginationToken;
        } else {
          more = false;
        }
        setUsers(allUsers);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //############################## API PARAMS ###################################

  const apiName = "palentirApi";
  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";

  const typeObject = "CompetitorMetric";
  const typeObjectW = "ExecDashTopSourcesSorted";
  const typeObjectD = "ExecDashTopDevicesSorted";
  const typeObjectC = "ExecDashTopCountriesSorted";
  const typeObjectP = "ExecDashTopPageNamesSorted";
  const typeObjectCI = "ComicIndexing";

  const propertyID = "p.numberOfUsers";

  const url = `competitormetric/${riOntology}/${typeObject}`; /// URL to fetch from API
  const urlW = `api/${riOntology}/${typeObjectW}/${propertyID}`;
  const urlD = `api/${riOntology}/${typeObjectD}/${propertyID}`;
  const urlC = `api/${riOntology}/${typeObjectC}/${propertyID}`;
  const urlP = `api/${riOntology}/${typeObjectP}/${propertyID}`;
  const urlCI = `comics/${riOntology}/${typeObjectCI}`;

  //############################# useEffect TO LOAD ALL THE DATA ONES ##########################

  //#################################################################
  //#################################################################
  //#################################################################
  //###################### TODO: utilize useContex 👇  ################
  //########################### to manage api query and data ########
  //#################################################################
  //👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇

  async function MarketAnalysisAPI() {
    setIsLoading(true);
    const path = `/${url}`;
    return await API.get(apiName, path).then((response) => {
      setDataTable(response.data);
      setIsLoading(false);
    });
  }
  async function SourceWebsite() {
    const path = `/${urlW}`;
    return await API.get(apiName, path).then((response) => {
      setTrafficData(response?.data);
      setstatus(1);
    });
  }
  async function DevicesWebsite() {
    const path = `/${urlD}`;
    return await API.get(apiName, path).then((response) => {
      setDeviceData(response?.data);
    });
  }
  async function TopCountriesWebsite() {
    const path = `/${urlC}`;
    return await API.get(apiName, path).then((response) => {
      setCountriesData(response?.data);
    });
  }
  async function TopPagesRoutes() {
    const path = `/${urlP}`;
    return await API.get(apiName, path).then((response) => {
      setPagesData(response?.data);
    });
  }
  async function getSocialIndicators() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialindicators";
    return await API.get(apiName, path).then((response) => {
      setSocialDataIndicators(response?.data);
    });
  }

  async function getSocialData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";
    return await API.get(apiName, path).then((response) => {
      setSocialData(response?.data);
    });
  }
  async function getSocialMessage() {
    const apiName = "palentirApi";
    const path = "/socialmedia/messages";
    return await API.get(apiName, path).then((response) => {
      setSocialDataMessage(response?.data);
    });
  }
  async function getComicIndex() {
    const apiName = "palentirApi";
    const path = `/${urlCI}`;
    return await API.get(apiName, path).then((response) => {
      setComicIndexing(response?.data);
    });
  }

  //############################# Form data ########################################

  //############################# MARKET ANALYSIS QUERY ########################################

  const data = dataTable.map((d) => {
    const { rid, ...rest } = d;

    return {
      ...rest?.properties,
    };
  });

  //############################## SOURCES WEBSITE QUERY ######################################

  const dataW = trafficData.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  //############################# WEBSITE TOP DEVICE  QUERY ###################################

  const dataD = deviceData.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  //############################# WEBSITE TOP COUNTRIES  QUERY ###################################

  const dataC = countriesData.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });
  //############################# WEBSITE TOP PAGE ROUTES  QUERY ###################################

  const dataP = pagesData.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  //############################# COMICS ANALYTICS  QUERY ###################################
  const dataCI = comicIndexing.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  React.useEffect(() => {
    MarketAnalysisAPI();
    SourceWebsite();
    DevicesWebsite();
    TopCountriesWebsite();
    TopPagesRoutes();
    getComicIndex();
    getSocialIndicators();
    getSocialData();
    getUsers();
    getSocialMessage();
  }, []);

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
                imgBg={
                  "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/624367ac5b97b001187139af_shubham-dhage-nOkWMjfMhnc-unsplash.jpeg"
                }
                // globes={globejson}
                color={"black"}
                textColor={"#fff"}
                user={user}
                allUsers={allUsers}
                signOut={signOut}
                title="Website Metrics"
                desc="Track Beckett's website behavior."
              />
            }
          >
            <Route
              index
              element={
                <WebsiteMediaMetric
                  dataW={dataW}
                  allUsers={allUsers}
                  dataD={dataD}
                  dataC={dataC}
                  dataP={dataP}
                  status={status}
                  isLoading={isLoading}
                />
              }
            />
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
              element={<MarketAnalysis data={data} />}
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
              element={<ComicAnalysis dataCI={dataCI} />}
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
            path="private"
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
              path="/private/ops-performance"
              element={<OpsPerformance />}
            />
          </Route>
          <Route
            path="private"
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
              path="/private/grading-update-data"
              element={<UpdateData />}
            />
          </Route>
          <Route
            path="private"
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
              path="/private/financial-performance"
              element={<FinancialPerformance />}
            />
          </Route>
          <Route
            path="private"
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
              path="/private/roi-performance"
              element={<ROIPerformance />}
            />
          </Route>
          <Route
            path="private"
            element={
              <Page
                imgBg={
                  "https://uploads-ssl.webflow.com/5e3335504b445e809f69e502/6260370da6dfb07ef78bcc37_inbound.jpeg"
                }
                globe={chat}
                color={"black"}
                textColor={"#fff"}
                signOut={signOut}
                user={user}
                title="Inbound daily/weekly report"
              />
            }
          >
            <Route
              path="/private/shipping_terms"
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
            <Route path="/dashboard/web-analysis" element={<Home />} />
          </Route>
          <Route
            path="private"
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
            <Route path="/private/grading-settings" element={<Settings />} />
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
                user={user}
                title="Settings"
              />
            }
          >
            <Route path="/dashboard/settings" element={<Settings />} />
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
  );
}

export default App;
