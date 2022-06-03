import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ProtectedRoute } from './modules/Auth/Components';
import { LoginScene, RegisterScene } from './modules/Auth/Scenes';
import { DashbaordLayout } from './modules/Dashboard/Components';
import { store } from './store';
import { theme } from './theme';

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="auth">
              <Route index element={<Navigate to="/auth/login" replace />} />
              <Route path="login" element={<LoginScene />} />
              <Route path="register" element={<RegisterScene />} />
            </Route>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashbaordLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer hideProgressBar />
      </ChakraProvider>
    </StoreProvider>
  );
};

export { App };
