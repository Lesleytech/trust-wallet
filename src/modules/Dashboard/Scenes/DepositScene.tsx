import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useMemo, useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Dialog } from '../Components';

interface FormValues {
  amount: number;
}

const DepositScene: FC = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const validationSchema: Yup.SchemaOf<FormValues> = useMemo(
    () =>
      Yup.object({
        amount: Yup.number().required().min(1).label('Amount'),
      }),
    [],
  );

  const handleSubmit = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsConfirmDialogOpen(false);
      toast('Transaction complete', { type: 'success' });
    }, 2000);
  }, []);

  return (
    <>
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
                    placeholder: 'Enter amount in USD',
                    type: 'number',
                  }}
                />
                <SubmitButton rightIcon={<HiOutlineArrowRight />} height="40px" isLoading={loading}>
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
        <Text fontWeight="500" as="span">
          {amount} USD
        </Text>
        . Do you confirm?
      </Dialog>
    </>
  );
};

export { DepositScene };
