import { Input, Text } from "@chakra-ui/react";

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter, preFilteredRows } = column;
  const count = preFilteredRows.length;
  return (
    <>
      <Text>{count} results </Text>
      <Input
        fontSize={"sm"}
        my={5}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`search column`}
      />
    </>
  );
}
