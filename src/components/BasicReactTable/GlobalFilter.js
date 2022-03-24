import { Input, Text } from "@chakra-ui/react";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <>
      <Text mb={2} color={"#2A85FF"} mt={6}>
        {" "}
        Search here:{" "}
      </Text>
      <Input
        w={"30%"}
        borderColor={"#2A85FF"}
        mb={6}
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
}
