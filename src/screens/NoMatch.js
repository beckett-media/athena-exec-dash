import React from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoMatch = ({ notFound, restricted }) => {
  return (
    <>
      <Box mb={25}>
        {notFound && <>Oops, it looks like this page does not exist.</>}
        {restricted && (
          <>
            You do not have permission to view this page. <br></br>Please
            contact your administator for access.
          </>
        )}
      </Box>
      <Flex>
        <Link to="/">
          <Button colorScheme="whiteAlpha">Click here to return home</Button>
        </Link>
        {restricted && (
          <>
            <Box mr={12.5}></Box>
            <a href="mailto:christian@plainspokendigital.com">
              <Button colorScheme="whiteAlpha">Contact admin</Button>
            </a>
          </>
        )}
      </Flex>
    </>
  );
};

NoMatch.defaultProps = {
  notFound: false,
  restricted: false,
};

export default NoMatch;
