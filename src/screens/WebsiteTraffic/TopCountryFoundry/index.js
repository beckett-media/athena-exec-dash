import React from "react";
import styles from "./TopCountry.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import useDarkMode from "use-dark-mode";
import { API } from "aws-amplify";
import Dropdown from "../../../components/Dropdown";
import BarChart from "./BarChart";

const TopCountry = ({ className, ...props }) => {
  const darkMode = useDarkMode(false);

  const [sorting, setSorting] = React.useState("2021");
  const intervals = ["2022", "2021", "2020", "2019"];
  const [datas, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "ExecDashTopCountriesSorted";
  const year = `${sorting}`;
  const propertyID = "p.numberOfUsers";

  const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`; // URL to fetch data from

  function getData() {
    const apiName = "palentirApi";
    const path = `/${url}`;

    return API.get(apiName, path);
  }

  React.useEffect(() => {
    setIsLoading(true);

    getData().then((res) => {
      setData(res?.data);
    });
    setIsLoading(false);
  }, [sorting, isLoading]);

  const data = datas.map((d) => {
    const { rid, ...rest } = d;
    return {
      ...rest?.properties,
    };
  });

  const topCountries = data?.slice(0, 10);

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${topCountries.length} countries`}
      description="This section shows where Beckett's website visitors are locate."
      classTitle="title-purple"
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            small
          />
        </>
      }
    >
      <BarChart data={topCountries} />
    </Card>
  );
};

export default TopCountry;
