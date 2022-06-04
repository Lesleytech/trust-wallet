import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/types';
import { auth } from '../../../utils/firebase';

const ProfileScene: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <Box>
      <Box bg="white" p="2em" borderRadius="15px" shadow="lg">
        <Flex alignItems="center" gap="2em">
          <Avatar name={currentUser?.fullName} color="white" bgColor="purple.400" size="xl" />
          <Box>
            <Text as="h1" m="0">
              {currentUser?.fullName}
            </Text>
            <Text color="gray.500" fontSize="sm" mb="1em">
              {currentUser?.email}
            </Text>
            <Button bg="#f44" _hover={{ bg: '#e33' }} onClick={() => auth.signOut()}>
              Log me out
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export { ProfileScene };
