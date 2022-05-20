import * as React from "react";
import { API, Auth, Hub } from "aws-amplify";

const ApiDataContext = React.createContext();

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

function useApiData() {
  const context = React.useContext(ApiDataContext);
  if (!context) {
    throw new Error(`useApiData must be used within a ApiDataProvider`);
  }
  return context;
}

function ApiDataProvider(props) {
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

  //############################# MARKET ANALYSIS QUERY ########################################
  async function MarketAnalysisAPI() {
    const path = `/${url}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;

        return {
          ...rest?.properties,
        };
      })
    );
  }

  //############################## SOURCES WEBSITE QUERY ######################################
  async function SourceWebsite() {
    const path = `/${urlW}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;
        return {
          ...rest?.properties,
        };
      })
    );
  }

  //############################# WEBSITE TOP DEVICE  QUERY ###################################
  async function DevicesWebsite() {
    const path = `/${urlD}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;
        return {
          ...rest?.properties,
        };
      })
    );
  }

  //############################# WEBSITE TOP COUNTRIES  QUERY ###################################
  async function TopCountriesWebsite() {
    const path = `/${urlC}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;
        return {
          ...rest?.properties,
        };
      })
    );
  }

  //############################# WEBSITE TOP PAGE ROUTES  QUERY ###################################
  async function TopPagesRoutes() {
    const path = `/${urlP}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;
        return {
          ...rest?.properties,
        };
      })
    );
  }

  async function getSocialIndicators() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialindicators";
    return API.get(apiName, path).then((response) => response.data);
  }

  async function getSocialData() {
    const apiName = "palentirApi";
    const path = "/socialmedia/socialdata";
    return API.get(apiName, path).then((response) => response.data);
  }

  async function getSocialMessage() {
    const apiName = "palentirApi";
    const path = "/socialmedia/messages";
    return API.get(apiName, path).then((response) => response.data);
  }

  //############################# COMICS ANALYTICS  QUERY ###################################
  async function getComicIndex() {
    const apiName = "palentirApi";
    const path = `/${urlCI}`;
    return API.get(apiName, path).then((response) =>
      response.data.map((d) => {
        const { rid, ...rest } = d;
        return {
          ...rest?.properties,
        };
      })
    );
  }

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      // Load data required for the first page
      Promise.allSettled([
        MarketAnalysisAPI(),
        SourceWebsite(),
        DevicesWebsite(),
        TopCountriesWebsite(),
        TopPagesRoutes(),
      ])
        .then(
          ([dataTable, trafficData, deviceData, countriesData, pagesData]) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value
            // Each promise return value is  `{value: <value>, status: "fulfilled"|"rejected"}`
            setDataTable(dataTable.value);
            setTrafficData(trafficData.value);
            setDeviceData(deviceData.value);
            setCountriesData(countriesData.value);
            setPagesData(pagesData.value);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });

      // Load the other data on the background
      Promise.allSettled([
        getComicIndex(),
        getSocialIndicators(),
        getSocialData(),
        getSocialMessage(),
        getOpsServiceLevel(),
      ]).then(
        ([
          comicIndex,
          socialIndicators,
          socialData,
          socialMessage,
          serviceLevel,
        ]) => {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value
          // Each promise return value is  `{value: <value>, status: "fulfilled"|"rejected"}`
          setComicIndexing(comicIndex.value);
          setSocialDataIndicators(socialIndicators.value);
          setSocialData(socialData.value);
          setSocialDataMessage(socialMessage.value);
          setServiceLevel(serviceLevel.value);
          // setUsers(users.value);
        }
      );
    };

    Hub.listen("auth", (data) => {
      const { payload } = data;

      if (payload.event === "signIn") {
        // console.log("fetch after signIn", payload.data.username);
        fetch();
      }
    });

    Auth.currentUserInfo().then((user) => {
      if (user) {
        // console.log("fetch after user", user);
        fetch();
      }
    });
  }, []);

  return (
    <ApiDataContext.Provider
      value={{
        dataTable,
        isLoading,
        trafficData,
        deviceData,
        countriesData,
        pagesData,
        socialDataIndicators,
        socialData,
        socialDataMessage,
        comicIndexing,
      }}
      {...props}
    />
  );
}

export { ApiDataProvider, useApiData };
