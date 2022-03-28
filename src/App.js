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
import NoMatch from "./screens/NoMatch";
import { API } from "aws-amplify";
import Loading from "./components/LottieAnimation/Loading";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [trafficData, setTrafficData] = React.useState([]);
  const [deviceData, setDeviceData] = React.useState([]);
  const [countriesData, setCountriesData] = React.useState([]);
  const [pagesData, setPagesData] = React.useState([]);
  const [socialDataIndicators, setSocialDataIndicators] = React.useState([]);
  const [socialData, setSocialData] = React.useState([]);
  const [socialDataMessage, setSocialDataMessage] = React.useState([]);

  //############################## API PARAMS ###################################

  const apiName = "palentirApi";
  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";

  const typeObject = "CompetitorMetric";
  const typeObjectW = "ExecDashTopSourcesSorted";
  const typeObjectD = "ExecDashTopDevicesSorted";
  const typeObjectC = "ExecDashTopCountriesSorted";
  const typeObjectP = "ExecDashTopPageNamesSorted";

  const propertyID = "p.numberOfUsers";

  const url = `competitormetric/${riOntology}/${typeObject}`; /// URL to fetch from API
  const urlW = `api/${riOntology}/${typeObjectW}/${propertyID}`;
  const urlD = `api/${riOntology}/${typeObjectD}/${propertyID}`;
  const urlC = `api/${riOntology}/${typeObjectC}/${propertyID}`;
  const urlP = `api/${riOntology}/${typeObjectP}/${propertyID}`;

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

  //############################# useEffect TO LOAD ALL THE DATA ONES ##########################

  function MarketAnalysisAPI() {
    const path = `/${url}`;
    return API.get(apiName, path);
  }
  function SourceWebsite() {
    const path = `/${urlW}`;
    return API.get(apiName, path);
  }
  function DevicesWebsite() {
    const path = `/${urlD}`;
    return API.get(apiName, path);
  }
  function TopCountriesWebsite() {
    const path = `/${urlC}`;
    return API.get(apiName, path);
  }
  function TopPagesRoutes() {
    const path = `/${urlP}`;
    return API.get(apiName, path);
  }
  function getSocialIndicators() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialindicators";
    return API.get(apiName, path);
  }

  function getSocialData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";
    return API.get(apiName, path);
  }
  function getSocialMessage() {
    const apiName = "palentirApi";
    const path = "/socialmedia/messages";
    return API.get(apiName, path);
  }

  React.useEffect(() => {
    (async function () {
      MarketAnalysisAPI().then((res) => {
        setDataTable(res?.data);
      });
      SourceWebsite().then((res) => {
        setTrafficData(res?.data);
      });
      DevicesWebsite().then((res) => {
        setDeviceData(res?.data);
      });
      TopCountriesWebsite().then((res) => {
        setCountriesData(res?.data);
      });
      TopPagesRoutes().then((res) => {
        setPagesData(res?.data);
      });
      const indicatorData = await getSocialIndicators();
      setSocialDataIndicators(indicatorData.data);

      const socialData = await getSocialData();
      setSocialData(socialData.data);

      const socialMessage = await getSocialMessage();
      setSocialDataMessage(socialMessage.data);

      if (data === []) {
        console.log("> 0");
        setIsLoading(true);
      } else {
        console.log("< 0");
        setIsLoading(false);
      }
    })();
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
                user={user}
                signOut={signOut}
                title="Website Metrics  👩🏻‍💻"
                desc="Track Beckett's website behavior for all your online marketing efforts"
              />
            }
          >
            <Route
              index
              element={
                <WebsiteMediaMetric
                  dataW={dataW}
                  dataD={dataD}
                  dataC={dataC}
                  dataP={dataP}
                  isLoading={isLoading}
                />
              }
            />
          </Route>
          <Route
            path="dashboard"
            element={
              <Page signOut={signOut} user={user} title="Card Market 📈" />
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
              <Page signOut={signOut} user={user} title="Comics Market 📈" />
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
                signOut={signOut}
                user={user}
                title="Grading Score Cards ☕️"
              />
            }
          >
            <Route path="/dashboard/web-analysis" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      )}
    </Authenticator>
  );
}

export default App;
