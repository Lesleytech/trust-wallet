import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const AuthLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Box display="grid" minH="100vh" gridTemplateRows="60px 1fr">
      <Flex
        as="header"
        position="sticky"
        align="center"
        justify={{ base: 'center', md: 'space-between' }}
        px="5vw"
        bg="#fff">
        <Link to="/">
          <Text as="h2">
            Trust
            <Text color="primary.main" as="span">
              .Wallet
            </Text>
          </Text>
        </Link>
        <Flex gap="0.5em" display={{ base: 'none', md: 'flex' }}>
          <Link to="/auth/register">
            <Button variant="outline">Create account</Button>
          </Link>
          <Link to="/auth/login">
            <Button>Login</Button>
          </Link>
        </Flex>
      </Flex>
      <Box as="main" px="8vw">
        {children}
      </Box>
    </Box>
  );
};

export { AuthLayout };
