import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { FC, lazy, Suspense } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RemoveTrailingSlash } from './Components';
import { AuthListener, ProtectedRoute } from './modules/Auth/Components';
import { store } from './store';
import { theme } from './theme';

const AuthLayout = lazy(() => import('./modules/Auth/Components/AuthLayout'));
const DashbaordLayout = lazy(() => import('./modules/Dashboard/Components/DashbaordLayout'));

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <ChakraProvider theme={theme}>
        <AuthListener>
          <BrowserRouter>
            <RemoveTrailingSlash />
            <Suspense
              fallback={
                <Flex h="100vh" alignItems="center" justifyContent="center">
                  <Spinner color="primary.main" size="xl" />
                </Flex>
              }>
              <Routes>
                <Route path="/auth/*" element={<AuthLayout />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <DashbaordLayout />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthListener>
        <ToastContainer hideProgressBar />
      </ChakraProvider>
    </StoreProvider>
  );
};

export { App };
