import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ProfileScene: FC = () => {
  return (
    <>
      <Box bg="white" p="1.5em" borderRadius="15px" minH="200px" shadow="lg">
        <Text>Profile scene</Text>
      </Box>
    </>
  );
};

export { ProfileScene };
