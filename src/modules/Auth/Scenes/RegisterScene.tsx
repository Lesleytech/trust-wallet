import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { InputControl, PinInputControl, SelectControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { secureQuestions } from '../../../data';
import { auth, db } from '../../../utils/firebase';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  secureQuestion: string;
  secureAnswer: string;
  pin: string;
  cardNumber: string;
}

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
  fullName: Yup.string().required().label('Full name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
  secureQuestion: Yup.string().required().label('Security question'),
  secureAnswer: Yup.string().required().label('Secure answer'),
  cardNumber: Yup.string()
    .required()
    .matches(/^\d+$/, 'Only numbers are allowed')
    .length(6, 'Card number must be 6 digits')
    .label('Card number'),
  pin: Yup.string().required().length(4, 'Security PIN must be 4 digits').label('Security PIN'),
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
          pin: data.pin,
        },
        account: {
          balance: 100000,
          cardNumber: data.cardNumber,
        },
      });

      let date, rand;
      const range = Math.floor(Math.random() * 100) + 1;

      for (let i = 1; i <= 35; i += 3) {
        date = new Date();
        rand = Math.floor(Math.random() * (range + 10) + 1);
        date.setDate(date.getDate() - i);

        await addDoc(collection(db, 'users', user.uid, 'transactions'), {
          type: 'withdrawal',
          timestamp: Timestamp.fromDate(date),
          amount: 50 * rand,
        });
      }

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
          cardNumber: '',
          pin: '',
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
          <Text fontSize="0.8rem" color="gray.500">
            Account details
          </Text>
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
          <Flex gap="2em">
            <InputControl
              label="Credit card last 6 digits"
              labelProps={{ fontSize: '0.8rem', color: 'gray.500', mb: '0.5em' }}
              name="cardNumber"
              isDisabled={loading}
              inputProps={{
                placeholder: 'XXXXXX',
              }}
            />
            <PinInputControl
              label="Security PIN"
              pinAmount={4}
              isDisabled={loading}
              name="pin"
              labelProps={{ fontSize: '0.8rem', color: 'gray.500', mb: '0.5em' }}
              pinInputProps={{ isDisabled: loading }}
            />
          </Flex>
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
    </>
  );
};

export { RegisterScene };
