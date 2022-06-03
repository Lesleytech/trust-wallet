import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { formatNumber } from '../../../helpers';
import { RootState } from '../../../store/types';

const HistoryScene: FC = () => {
  const { transactions } = useSelector((state: RootState) => state.account);

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
              {transactions.length === 0 ? (
                <Tr>
                  <Td fontSize="sm">No record.</Td>
                </Tr>
              ) : (
                transactions.map(({ amount, id, timestamp, type }) => (
                  <Tr key={id}>
                    <Td textTransform="capitalize">{type}</Td>
                    <Td isNumeric>{formatNumber(amount)}</Td>
                    <Td>{dayjs(timestamp).format('MMM D, YYYY h:mm A')}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export { HistoryScene };
