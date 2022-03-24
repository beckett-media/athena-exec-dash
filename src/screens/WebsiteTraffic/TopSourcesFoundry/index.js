import React from "react";
import styles from "./TopSource.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import { API } from "aws-amplify";
import { Text } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";
import BarChart from "./BarChart";

const TopSource = ({ className }) => {
  const [sorting, setSorting] = React.useState("2021");
  const intervals = ["2022", "2021", "2020", "2019"];
  const [datas, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const riOntology =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const typeObject = "ExecDashTopSourcesSorted";
  const year = `${sorting}`;
  const propertyID = "p.numberOfUsers";

  const url = `api/${riOntology}/${typeObject}/${year}/${propertyID}`;

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

  const topSources = data?.slice(0, 16);

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${topSources.length} sources of website visitors`}
      description="The graph below highlights the top 5 sources of website traffic for Beckett's website."
      classTitle="title-purple"
      head={
        <>
          <Text mr={3}>Filter</Text>
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
      <BarChart data={topSources} />
    </Card>
  );
};

export default TopSource;
