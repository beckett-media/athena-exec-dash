import React from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import PagesURL from "./PagesURL";
import { API } from "aws-amplify";
import Loading from "../../../components/LottieAnimation/Loading";

const PageTraffics = (props) => {
  const [data, setData] = React.useState([]);

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "ExecDashTopPageNamesSorted";
  const year = "2022";
  const propertyID = "p.numberOfUsers";

  const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`; /// URL to fetch from API

  function getData() {
    const apiName = "palentirApi";
    const path = `/${url}`;

    return API.get(apiName, path);
  }

  const dropDownChange = (e) => {
    const year = e.target.value;
    const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`; /// URL to fetch from API
    const apiName = "foundryapi";
    const path = `/${url}`;

    API.get(apiName, path).then((response) => {
      setData(response);
    });
  };

  React.useEffect(() => {
    (async function () {
      const response = await getData();
      setData(response);
    })();
  }, []);

  const liveData = data?.data; // Get data from API
  const date = [];
  const numberOfUsers = [];
  const pageTitles = [];
  const tableData = [];

  const topPathsTitle = liveData; // Get top 5 paths

  topPathsTitle?.forEach((element) => {
    // Loop through top paths create object
    date.push(element?.properties?.dates); // Push dates to date array
    numberOfUsers.push(element?.properties?.numberOfUsers); // Push number of users to numberOfUsers array
    pageTitles.push(element?.properties?.pageTitle); // Push pageTitles to pageTitles array
  });

  // create array of objects for table data
  pageTitles?.forEach((element, index) => {
    tableData.push({
      pageTitle: element,
      numberOfUsers: numberOfUsers[index],
      date: date[index],
    });
  });

  return (
    <>
      {tableData === [] ? (
        <Loading loadingG={"loadingG"} marginTop={0} width={"15rem"} />
      ) : (
        <Card
          className={styles.card}
          title={`Page Traffic`}
          classTitle={cn("title-purple", styles.title)}
          description={
            "The traffic reports are all about seeing what visitors are actually doing on Beckett's website. By using these user traffic reports, you can assess the performance of your website content and determine if your visitors are taking the actions you need."
          }
          classCardHead={styles.head}
        >
          <div className={styles.products}>
            <div className={styles.wrapper}>
              <PagesURL items={tableData} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default PageTraffics;
