import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { auth } from '../../../utils/firebase';

const ProfileScene: FC = () => {
  return (
    <>
      <Box bg="white" p="2em" borderRadius="15px" shadow="lg">
        <Flex alignItems="center" gap="2em">
          <Avatar name="Lafen Lesley" color="white" bgColor="purple.400" size="xl" />
          <Box>
            <Text as="h1" m="0">
              Lafen Lesley
            </Text>
            <Text color="gray.500" fontSize="sm" mb="1em">
              lafenlesley@gmail.com
            </Text>
            <Button bg="#f44" _hover={{ bg: '#e33' }} onClick={() => auth.signOut()}>
              Log me out
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export { ProfileScene };
