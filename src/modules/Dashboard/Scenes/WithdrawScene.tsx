import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { InputControl, PinInputControl, SelectControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { secureQuestions } from '../../../data';
import { formatNumber } from '../../../helpers';
import { getAvgWithdrawal } from '../../../store/slices/account';
import { RootState } from '../../../store/types';
import { auth, db } from '../../../utils/firebase';
import { Dialog } from '../Components';

interface WithDrawValues {
  amount: number;
}

interface SecurityValues {
  question: string;
  answer: string;
}

interface PinCheckValues {
  pin: string;
}

const securityValidationSchema: Yup.SchemaOf<SecurityValues> = Yup.object({
  answer: Yup.string().required().label('Secure answer'),
  question: Yup.string().required().label('Security question'),
});

const pinCheckValidationSchema: Yup.SchemaOf<PinCheckValues> = Yup.object({
  pin: Yup.string().required().length(4, 'Security PIN must be 4 digits').label('Security PIN'),
});

const WithdrawScene: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [amount, setAmount] = useState(5);
  const securityFormRef = useRef<any>();
  const pinCheckFormRef = useRef<any>();
  const { balance } = useSelector((state: RootState) => state.account);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const avgWithdrawal = useSelector(getAvgWithdrawal);

  const withdrawValidationSchema: Yup.SchemaOf<WithDrawValues> = useMemo(
    () =>
      Yup.object({
        amount: Yup.number().required().min(5).max(balance).label('Amount'),
      }),
    [balance],
  );

  const withdraw = useCallback(async () => {
    try {
      await addDoc(collection(db, 'users', currentUser?.uid || '', 'transactions'), {
        type: 'withdrawal',
        timestamp: serverTimestamp(),
        amount,
      });

      await updateDoc(doc(db, 'users', currentUser?.uid || ''), {
        'account.balance': increment(-amount),
      });

      toast('Transaction complete', { type: 'success' });
    } catch (err) {
      toast('An error occured', { type: 'error' });
    }
  }, [amount, currentUser]);

  const handleSubmit = useCallback(async () => {
    if (amount > avgWithdrawal * 2) {
      setIsFlagged(true);
      setIsConfirmOpen(false);
    } else {
      setLoading(true);
      await withdraw().then(() => setIsConfirmOpen(false));
      setLoading(false);
    }
  }, [amount, avgWithdrawal, withdraw]);

  const handlePinCheck = useCallback(
    async ({ pin }: PinCheckValues) => {
      if (!currentUser) return;
      setLoading(true);

      try {
        const docSnap = await getDoc(doc(db, 'users', currentUser.uid));

        if (docSnap.exists()) {
          const { secure } = docSnap.data();

          if (pin === secure.pin) {
            handleSubmit();
          } else {
            toast('An incorrect PIN was entered', { type: 'error' });
          }
        }
      } catch (err) {
        toast('An error occured', { type: 'error' });
      } finally {
        setLoading(false);
      }
    },
    [currentUser, handleSubmit],
  );

  const handleSecureSubmit = useCallback(
    async ({ answer, question }: SecurityValues) => {
      if (!currentUser) return;
      setLoading(true);

      try {
        const docSnap = await getDoc(doc(db, 'users', currentUser.uid));

        if (docSnap.exists()) {
          const { secure } = docSnap.data();

          if (question === secure.question && answer === secure.answer) {
            await withdraw().then(() => setIsFlagged(false));
          } else {
            toast('Incorrect question/answer! You will be logged out', { type: 'error' });
            setTimeout(() => {
              auth.signOut();
            }, 3000);
          }
        }
      } catch (err) {
        toast('An error occured', { type: 'error' });
      } finally {
        setLoading(false);
      }
    },
    [currentUser, withdraw],
  );

  return (
    <Box>
      <Box bg="white" p="1.5em 2em" borderRadius="15px" minH="200px" shadow="lg">
        <Text fontSize="sm" mb="0.5em">
          Enter the amount to withdraw
        </Text>
        <Flex mb="3em">
          <Formik
            initialValues={{ amount: 5 }}
            onSubmit={({ amount }) => {
              setAmount(amount);
              setIsConfirmOpen(true);
            }}
            validationSchema={withdrawValidationSchema}>
            <Form>
              <Flex gap="1em">
                <InputControl
                  name="amount"
                  inputProps={{
                    placeholder: 'Enter amount in ₦',
                    type: 'number',
                  }}
                />
                <SubmitButton rightIcon={<HiOutlineArrowRight />} height="40px" isLoading={false}>
                  Continue
                </SubmitButton>
              </Flex>
            </Form>
          </Formik>
        </Flex>
        <Text fontSize="sm" color="gray.500">
          You can withdraw a minimum of {formatNumber(5)} and a maximum of {formatNumber(balance)}
        </Text>
      </Box>
      <Dialog
        loading={loading}
        title="Confirm Withdrawal"
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        ConfirmButton={
          <Button
            onClick={() => pinCheckFormRef.current?.handleSubmit?.()}
            isLoading={loading}
            disabled={loading}>
            Continue
          </Button>
        }>
        You are about to withdraw{' '}
        <Text fontWeight="500" as="span">
          {formatNumber(amount)}
        </Text>
        . Enter your security PIN to continue
        <Formik
          validationSchema={pinCheckValidationSchema}
          initialValues={{ pin: '' }}
          onSubmit={handlePinCheck}
          innerRef={pinCheckFormRef}>
          <Form>
            <Flex justifyContent="center" mt="2em" mb="1.5em">
              <PinInputControl
                w="fit-content"
                pinAmount={4}
                isDisabled={loading}
                name="pin"
                pinInputProps={{ isDisabled: loading }}
              />
            </Flex>
          </Form>
        </Formik>
      </Dialog>
      <Dialog
        loading={loading}
        title="Security Check"
        open={isFlagged}
        onClose={() => setIsFlagged(false)}
        ConfirmButton={
          <Button
            onClick={() => securityFormRef.current?.handleSubmit?.()}
            isLoading={loading}
            disabled={loading}>
            Continue
          </Button>
        }>
        <Text fontSize="sm" mb="1em">
          This transaction has been flagged as suspicious. Please provide your security
          question/answer.
        </Text>
        <Formik
          innerRef={securityFormRef}
          initialValues={{ answer: '', question: secureQuestions[0] }}
          validationSchema={securityValidationSchema}
          onSubmit={handleSecureSubmit}>
          <Form autoComplete="off">
            <SelectControl name="question" mb="0.5em">
              {secureQuestions.map((q, i) => (
                <option value={q} key={i}>
                  {q}
                </option>
              ))}
            </SelectControl>
            <InputControl
              name="answer"
              inputProps={{
                placeholder: 'Security question answer',
              }}
            />
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
};

export { WithdrawScene };
