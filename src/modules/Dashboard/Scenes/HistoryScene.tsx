import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

const HistoryScene: FC = () => {
  return (
    <>
      <Box bg="white" p="1.5em 2em" borderRadius="15px" minH="200px" shadow="lg">
        <Text fontSize="sm" color="gray.500">
          Here are all your recent transactions
        </Text>
        <TableContainer mt="2em" fontSize="sm">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th isNumeric>Amount ($)</Th>
                <Th>Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textTransform="capitalize">deposit</Td>
                <Td isNumeric>400</Td>
                <Td>Dec 12, 2022 at 5:45PM</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export { HistoryScene };
