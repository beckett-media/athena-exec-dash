import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  FormLabel,
  Select,
  Textarea,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

function DrawerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <Button leftIcon={<FiFilter />} colorScheme="teal" onClick={onOpen}>
        View posts by dates
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"md"}
        bg={"black.900"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Drilldown by date</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="owner">Select Dates</FormLabel>
                <Select id="owner" defaultValue="segun">
                  <option value="segun">02/25/2022</option>
                  <option value="kola">02/26/2022</option>
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          {/* <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerModal;
