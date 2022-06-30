import React from "react";
import styles from "./Chart.module.sass";
import cn from "classnames";
import Card from "../../../../components/Card";
import PlotRow from "./PlotRow";
import useDarkMode from "use-dark-mode";
import {
  Box,
  Text,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { BsArrowRightSquareFill, BsArrowDownSquareFill } from "react-icons/bs";

const CompanyGraphs = ({
  className,
  title,
  data,
  accountsToUse,
  companies,
  hideNoData
}) => {
  const darkMode = useDarkMode(false);
  const [year, setYear] = React.useState("2022");

  //const uniqueAccount = [...new Set(monthly.map((item) => item.Account))];
  const uniqueAccount = ["Net Income", "GAAP EBITDA", "Management EBITDA"];

  const uniqueYear = [...new Set(data.map((item) => item.Year))].sort(
    (a, b) => b - a
  );

  const dataFilteredByYear = data.filter((d) => d?.Year === year);

  return (
    <Card
      classTitle="title-blue"
      title={title}
      // description={`BGS sell through has dropped under 10% for the first time. It peaked at 33.2% in March 2021.`}
      className={cn(styles.card, className)}
      head={
        <Box
          flexDirection={"row"}
          display={"flex"}
          gap={3}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Text mr={3}>Year</Text>
          <Select
            colorScheme={darkMode.value ? "dark" : "light"}
            borderRadius={14}
            boxShadow="sm"
            color={"#6F767E"}
            size="md"
            variant="outline"
            borderColor="#272B30"
            onChange={(e) => setYear(e.target.value)}
            // value={console.log(year)}
            _focusVisible={{
              borderColor: "#272B30",
              boxShadow: "0 0 0 2px #272B30",
            }}
            fontSize={14}
          >
            {uniqueYear.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </Select>
        </Box>
      }
    >

    <Box
        // className={'directions-container'}
        padding={3}
        borderRadius={8}
        marginTop={10}
        marginBottom={10}
        bg={darkMode.value ? "#272B30" : "#CBD5E0"}
        textAlign={'left'}
        color={'#a0aec0'}
      >
        
        <Text marginBottom={3}>
          Choose the year above to filter the data below. Click on gray bars below to expand/contract companies. 
        </Text>
      </Box>
      <Accordion allowMultiple allowToggle defaultIndex={[0]}>
        {companies &&
          companies.map((item) => {
            console.log(item);

            return (
              <Box>
                <Box marginBottom={2}>

                </Box>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="gray.600">
                      <Box flex="1" textAlign="center">
                      <AccordionIcon />  {item}
                      </Box>
                      
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <PlotRow
                      data={data}
                      dataFilteredByYear={dataFilteredByYear}
                      company={item}
                      accountsToUse={accountsToUse}
                      hideNoData={hideNoData}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Box>
            );
          })}
        
      </Accordion>
    </Card>
  );
};

export default CompanyGraphs;
