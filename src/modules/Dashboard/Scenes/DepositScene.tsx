import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useMemo, useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { formatNumber } from '../../../helpers';
import { RootState } from '../../../store/types';
import { db } from '../../../utils/firebase';
import { Dialog } from '../Components';

interface FormValues {
  amount: number;
}

const DepositScene: FC = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const validationSchema: Yup.SchemaOf<FormValues> = useMemo(
    () =>
      Yup.object({
        amount: Yup.number().required().min(1).label('Amount'),
      }),
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'transactions'), {
        type: 'deposit',
        timestamp: serverTimestamp(),
        amount,
      });

      await updateDoc(doc(db, 'users', currentUser.uid), {
        'account.balance': increment(amount),
      });

      setIsConfirmDialogOpen(false);
      toast('Transaction complete', { type: 'success' });
    } catch (err) {
      toast('An error occured', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [amount, currentUser]);

  return (
    <Box>
      <Box bg="white" p="1.5em 2em" borderRadius="15px" minH="200px" shadow="lg">
        <Text fontSize="sm" mb="0.5em">
          Enter the amount to deposit
        </Text>
        <Flex mb="3em">
          <Formik
            initialValues={{ amount: 1 }}
            onSubmit={({ amount }) => {
              setAmount(amount);
              setIsConfirmDialogOpen(true);
            }}
            validationSchema={validationSchema}>
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
          Your account balance will be updated once the transaction is completed
        </Text>
      </Box>
      <Dialog
        loading={loading}
        title="Confirm Deposit"
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        ConfirmButton={
          <Button onClick={handleSubmit} isLoading={loading} disabled={loading}>
            Continue
          </Button>
        }>
        You are about to deposit{' '}
        <Text fontWeight="700" as="span">
          {formatNumber(amount)}
        </Text>
        . Do you confirm?
      </Dialog>
    </Box>
  );
};

export { DepositScene };
