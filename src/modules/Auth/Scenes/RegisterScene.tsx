import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SelectControl, SubmitButton } from 'formik-chakra-ui';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthLayout } from '../Components';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  secureQuestion: string;
  secureAnswer: string;
}

const secureQuestions = [
  "What is your mother's maiden name?",
  "What is your first pet's name?",
  "What is your eldest cousin's last name?",
];

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
  fullName: Yup.string().required().label('Full name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
  secureQuestion: Yup.string().required().label('Security question'),
  secureAnswer: Yup.string().required().label('Secure answer'),
});

const RegisterScene: FC = () => {
  return (
    <>
      <Helmet>
        <title>Register | Trust Wallet</title>
      </Helmet>
      <AuthLayout>
        <Box textAlign="center" my="1.5em">
          <Text as="h1" mb="0.2em">
            Create an account
          </Text>
          <Text color="gray.500" fontSize="0.9rem">
            Fill in the form and click on continue
          </Text>
        </Box>
        <Formik
          initialValues={{
            email: '',
            password: '',
            fullName: '',
            secureQuestion: secureQuestions[0],
            secureAnswer: '',
          }}
          onSubmit={() => {}}
          validationSchema={validationSchema}>
          <Flex as={Form} maxW="400px" direction="column" mx="auto" gap="0.5em" pb="75px">
            <InputControl
              name="fullName"
              inputProps={{
                placeholder: 'Enter full name',
              }}
            />
            <InputControl
              name="email"
              inputProps={{
                placeholder: 'Email address',
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
            <br />
            <Text fontSize="0.8rem" color="gray.500">
              Choose a security question and provide a secret answer. This question will be used to
              verify transactions that appear suspicious.
            </Text>
            <SelectControl name="secureQuestion">
              {secureQuestions.map((q, i) => (
                <option value={q} key={i}>
                  {q}
                </option>
              ))}
            </SelectControl>
            <InputControl
              name="secureAnswer"
              inputProps={{
                placeholder: 'Security question answer',
              }}
            />
            <Flex alignItems="flex-end" justifyContent="space-between">
              <SubmitButton rightIcon={<HiOutlineArrowRight />} alignSelf="flex-end" mt="2em">
                Continue
              </SubmitButton>
              <ChakraLink as={Link} to="/auth/login" fontSize="sm" fontWeight="500">
                Login into your account
              </ChakraLink>
            </Flex>
          </Flex>
        </Formik>
      </AuthLayout>
    </>
  );
};

export { RegisterScene };
