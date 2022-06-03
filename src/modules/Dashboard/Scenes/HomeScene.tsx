import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/types';

const HomeScene: FC = () => {
  const { balance } = useSelector((state: RootState) => state.account);

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
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
            $0.00
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
            $0.00
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

export { HomeScene };
