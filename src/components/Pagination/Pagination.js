import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import styles from "./pagination.module.sass";

function Pagination({ itemsPerPage, totalPages, paginate, itemSelected }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  async function handlePageClick(page) {
    paginate(page);
    itemSelected(page);
    setCurrentPage(page);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <Box px={{ base: "4", md: "6" }} pb="5" key={number}>
            <HStack spacing="3" justify="space-between">
              <Box
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                flexDirection={"row"}
              >
                <Button
                  // style bg color and hover color and page selected current page
                  bg={currentPage === number ? "blue.500" : "gray.400"}
                  borderRadius="100%"
                  onClick={() => handlePageClick(number)}
                >
                  {number}
                </Button>
              </Box>
            </HStack>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
