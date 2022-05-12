import * as React from "react";
import AWS from "aws-sdk";
import { API, Auth } from "aws-amplify";

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
        status,
        allUsers,
      }}
      {...props}
    />
  );
}

export { ApiDataProvider, useApiData };
