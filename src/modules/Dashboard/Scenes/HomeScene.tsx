import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const HomeScene: FC = () => {
  return (
    <>
      <Flex height="100px" gap="1em" mb="1.5em">
        <Flex
          flex="1"
          bg="purple.100"
          borderRadius="15px"
          shadow="lg"
          px="1.5em"
          justifyContent="center"
          flexDir="column">
          <Text fontSize="sm">Account balance</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            $100,000.58
          </Text>
        </Flex>
        <Flex
          flex="1"
          bg="green.100"
          borderRadius="15px"
          shadow="lg"
          px="1.5em"
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
          px="1.5em"
          justifyContent="center"
          flexDir="column">
          <Text fontSize="sm">Today's deposit</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            $0.00
          </Text>
        </Flex>
      </Flex>
      <Box bg="white" p="1.5em" borderRadius="15px" minH="200px" shadow="lg">
        <Text as="h3">Today's transactions</Text>
      </Box>
    </>
  );
};

export { HomeScene };
