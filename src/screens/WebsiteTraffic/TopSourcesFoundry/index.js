import React from "react";
import styles from "./TopSource.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import { Text } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";
import BarChart from "./BarChart";
import Loading from "../../../components/LottieAnimation/Loading";

const TopSource = ({ className, topSources, isLoading, status }) => {
  const [sorting, setSorting] = React.useState("2022");
  const data = topSources.filter((d) => d?.dates === sorting);
  const topSourcesData = data.slice(0, 17);
  
  const intervals = ["2022", "2021", "2020", "2019"];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${topSourcesData.length} sources  out of 154 website visitors`}
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
      <BarChart data={topSourcesData} />
    </Card>
  );
};

export default TopSource;
