import React from "react";
import styles from "./TopSource.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import { Box, Text } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";
import BarChart from "./BarChart";
import Loading from "../../../components/LottieAnimation/Loading";

const TopSource = ({ className, topSources, isLoading, status }) => {
  const [sorting, setSorting] = React.useState("2022");
  const [sortingNum, setSortingNum] = React.useState(20);
  
  const intervals = ["2022", "2021", "2020", "2019"];


  const data = topSources.filter((d) => d?.dates === sorting);
  const topSourcesData = data.slice(0, sortingNum);

  const total = data.slice(0, 900);
  const totalQuery = [20, 50, 80, 120, total.length];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card
      className={cn(styles.card, className)}
      title={`Top ${topSourcesData.length} sources of website visitors out of ${total.length}`}
      description="The graph below highlights the top sources of website traffic (by total, non-unique users) for Beckett's website."
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
          <Box m={1} />
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sortingNum}
            setValue={setSortingNum}
            options={totalQuery}
            total={total.length}
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
