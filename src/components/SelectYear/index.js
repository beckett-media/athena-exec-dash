import React, { Children } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

function index({childreen}) {
  return (
    <FormControl>
      <FormLabel htmlFor="country">Years</FormLabel>
      <Select id="country" placeholder="Select year">
        {childreen}
      </Select>
    </FormControl>
  );
}

export default index;
