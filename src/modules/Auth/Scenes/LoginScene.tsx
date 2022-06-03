import { Box, Flex, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { auth } from '../../../utils/firebase';
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async ({ email, password }: FormValues) => {
      setLoading(true);

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/', { replace: true });
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          toast('Invalid email/password', { type: 'error' });
        } else {
          toast('Authentication error', { type: 'error' });
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate],
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
              isDisabled={loading}
              inputProps={{
                placeholder: 'Enter email address',
                type: 'email',
              }}
            />
            <InputControl
              name="password"
              isDisabled={loading}
              inputProps={{
                placeholder: 'Enter password',
                type: 'password',
              }}
            />
            <Flex alignItems="flex-end" justifyContent="space-between">
              <SubmitButton
                rightIcon={<HiOutlineArrowRight />}
                alignSelf="flex-end"
                mt="2em"
                isLoading={loading}
                loadingText="Logging in">
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
