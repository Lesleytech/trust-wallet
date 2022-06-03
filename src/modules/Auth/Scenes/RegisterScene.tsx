import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { InputControl, SelectControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { secureQuestions } from '../../../data';
import { auth, db } from '../../../utils/firebase';
import { AuthLayout } from '../Components';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  secureQuestion: string;
  secureAnswer: string;
}

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
  fullName: Yup.string().required().label('Full name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
  secureQuestion: Yup.string().required().label('Security question'),
  secureAnswer: Yup.string().required().label('Secure answer'),
});

const RegisterScene: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: FormValues) => {
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.fullName });

      await setDoc(doc(db, 'users', user.uid), {
        fullName: data.fullName,
        email: data.email,
        secure: {
          question: data.secureQuestion,
          answer: data.secureAnswer,
        },
      });

      toast('Registration complete', { type: 'success' });
      window.location.replace('/');
    } catch (err) {
      toast('An error occured', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

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
              name="fullName"
              isDisabled={loading}
              inputProps={{
                placeholder: 'Enter full name',
              }}
            />
            <InputControl
              name="email"
              isDisabled={loading}
              inputProps={{
                placeholder: 'Email address',
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
            <br />
            <Text fontSize="0.8rem" color="gray.500">
              Choose a security question and provide a secret answer. This question will be used to
              verify transactions that appear suspicious.
            </Text>
            <SelectControl name="secureQuestion" isDisabled={loading}>
              {secureQuestions.map((q, i) => (
                <option value={q} key={i}>
                  {q}
                </option>
              ))}
            </SelectControl>
            <InputControl
              name="secureAnswer"
              isDisabled={loading}
              inputProps={{
                placeholder: 'Security question answer',
              }}
            />
            <Flex alignItems="flex-end" justifyContent="space-between">
              <SubmitButton
                rightIcon={<HiOutlineArrowRight />}
                alignSelf="flex-end"
                mt="2em"
                isLoading={loading}
                loadingText="Creating account">
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
