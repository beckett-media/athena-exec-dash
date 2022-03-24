import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Table,
  Button,
} from "@chakra-ui/react";

import { BsArrowRightSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { AiOutlineGroup, AiOutlineUngroup } from "react-icons/ai";
import Card from "../../components/Card";
import useDarkMode from "use-dark-mode";
import data from "../../mocks/comic-data";
import cn from "classnames";
import styles from "./Table.module.sass";
import { numberWithCommas } from "../../utils.js";
import moment from "moment";
import BasicTable from "../../components/BasicReactTable";
import SortedTable from "../../components/BasicReactTable/SortingTable";
import FilterTable from "../../components/BasicReactTable/FilterTable";
import PaginationTable from "../../components/BasicReactTable/PaginationTable";
import TableWithAPI from "../../components/BasicReactTable/TableWithAPI";

function PivotTable() {
  const datas = data;

  return <TableWithAPI cells={datas} />;
}

export default PivotTable;
