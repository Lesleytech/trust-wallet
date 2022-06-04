import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { LoginScene, RegisterScene } from '../Scenes';

const AuthLayout: FC = () => {
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
        <Routes>
          <Route path="login" element={<LoginScene />} />
          <Route path="register" element={<RegisterScene />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AuthLayout;
