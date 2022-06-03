import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { formatNumber } from '../../../helpers';
import { getTodayTotal, getTodayTransactions } from '../../../store/slices/account';
import { RootState } from '../../../store/types';

const HomeScene: FC = () => {
  const { balance } = useSelector((state: RootState) => state.account);
  const todayTransactions = useSelector(getTodayTransactions);
  const todayTotal = useSelector(getTodayTotal);

  return (
    <>
      <Flex height="100px" gap="1em" mb="1.5em">
        <Flex
          flex="1"
          bg="purple.100"
          borderRadius="15px"
          shadow="lg"
          px="2em"
          justifyContent="center"
          flexDir="column">
          <Text fontSize="sm">Account balance</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            ${formatNumber(balance)}
          </Text>
        </Flex>
        <Flex
          flex="1"
          bg="green.100"
          borderRadius="15px"
          shadow="lg"
          px="2em"
          justifyContent="center"
          flexDir="column">
          <Text fontSize="sm">Today's withdrawal</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            ${formatNumber(todayTotal.withdraw)}
          </Text>
        </Flex>
        <Flex
          flex="1"
          bg="blue.100"
          borderRadius="15px"
          shadow="lg"
          px="2em"
          justifyContent="center"
          flexDir="column">
          <Text fontSize="sm">Today's deposit</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            ${formatNumber(todayTotal.deposit)}
          </Text>
        </Flex>
      </Flex>
      <Box bg="white" p="1.5em 2em" borderRadius="15px" minH="200px" shadow="lg">
        <Text as="h3">Today's transactions</Text>
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
              {todayTransactions.length === 0 ? (
                <Tr>
                  <Td fontSize="sm">No record.</Td>
                </Tr>
              ) : (
                todayTransactions.map(({ amount, id, timestamp, type }) => (
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

export { HomeScene };
