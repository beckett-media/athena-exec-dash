import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { AiOutlineFileSearch } from "react-icons/ai";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <InputGroup
      maxW={{
        sm: "xs",
      }}
      mb={6}
    >
      <InputLeftElement pointerEvents="none">
        <Icon as={AiOutlineFileSearch} color="muted" boxSize="5" />
      </InputLeftElement>
      <Input
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </InputGroup>
  );
}
