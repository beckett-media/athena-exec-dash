import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <Box mb={25}>
        Oops, it looks like this page either does not exist or that you do not
        have permission to view it. <br></br>Please contact your administator
        for access.
      </Box>
      <Link to="/">
        <Button colorScheme="whiteAlpha">Click here to return home</Button>
      </Link>
    </>
  );
};

export default NoMatch;
