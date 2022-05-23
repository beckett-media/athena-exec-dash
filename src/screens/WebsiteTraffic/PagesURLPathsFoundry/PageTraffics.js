import React from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import PagesURL from "./PagesURL";
import { API } from "aws-amplify";
import Loading from "../../../components/LottieAnimation/Loading";
import { Box, Text } from "@chakra-ui/react";
import Dropdown from "../../../components/Dropdown";

const PageTraffics = ({ data }) => {
  const [sorting, setSorting] = React.useState("2022");
  const intervals = ["2022", "2021", "2020", "2019"];
  const liveData = data.filter((d) => d?.dates === sorting);

  const date = [];
  const numberOfUsers = [];
  const pageTitles = [];
  const tableData = [];

  const topPathsTitle = liveData; // Get top 5 paths

  topPathsTitle?.forEach((element) => {
    // Loop through top paths create object
    date.push(element?.dates); // Push dates to date array
    numberOfUsers.push(element?.numberOfUsers); // Push number of users to numberOfUsers array
    pageTitles.push(element?.pageTitle); // Push pageTitles to pageTitles array
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
          title={`Page traffic`}
          classTitle={cn("title-purple", styles.title)}
          description={
            "The traffic reports are all about seeing what visitors are actually doing on Beckett's website. By using these user traffic reports, you can assess the performance of your website content and determine if your visitors are taking the actions you need."
          }
          head={
            <Box
              flex={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Text mr={3}>Filter</Text>
              <Dropdown
                className={styles.dropdown}
                classDropdownHead={styles.dropdownHead}
                value={sorting}
                setValue={setSorting}
                options={intervals}
                small
              />
            </Box>
          }
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
