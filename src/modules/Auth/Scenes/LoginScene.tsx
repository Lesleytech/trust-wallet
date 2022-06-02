import { Box, Flex, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../../../store/slices/auth';
import { AuthLayout } from '../Components';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const LoginScene: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    ({ email }: FormValues) => {
      dispatch(login({ email, fullName: 'Lafen Lesley', uid: 'iIljKJSDFOIjlNSDFOIn' }));
      navigate('/', { replace: true });
    },
    [dispatch, navigate],
  );

  return (
    <>
      <Helmet>
        <title>Login | Trust Wallet</title>
      </Helmet>
      <AuthLayout>
        <Image
          src="/images/credit-card-illustration.svg"
          maxW="250px"
          alt="Credit card illustration"
          display="block"
          mx="auto"
          my="2.5em"
        />
        <Box textAlign="center" mb="1.5em">
          <Text as="h1" mb="0.2em">
            Sign into your wallet
          </Text>
          <Text color="gray.500" fontSize="0.9rem">
            Enter your credentials and click on continue
          </Text>
        </Box>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <Flex
            as={Form}
            maxW="400px"
            direction="column"
            mx="auto"
            gap="0.5em"
            pb="75px"
            autoComplete="off">
            <InputControl
              name="email"
              inputProps={{
                placeholder: 'Enter email address',
                type: 'email',
              }}
            />
            <InputControl
              name="password"
              inputProps={{
                placeholder: 'Enter password',
                type: 'password',
              }}
            />
            <Flex alignItems="flex-end" justifyContent="space-between">
              <SubmitButton rightIcon={<HiOutlineArrowRight />} alignSelf="flex-end" mt="2em">
                Continue
              </SubmitButton>
              <ChakraLink as={Link} to="/auth/register" fontSize="sm" fontWeight="500">
                Create an account
              </ChakraLink>
            </Flex>
          </Flex>
        </Formik>
      </AuthLayout>
    </>
  );
};

export { LoginScene };
