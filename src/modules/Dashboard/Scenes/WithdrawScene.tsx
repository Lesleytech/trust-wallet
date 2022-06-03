import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl, SelectControl, SubmitButton } from 'formik-chakra-ui';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import * as Yup from 'yup';

import { secureQuestions } from '../../../data';
import { Dialog } from '../Components';

interface WithDrawValues {
  amount: number;
}

interface SecurityValues {
  question: string;
  answer: string;
}

const securityValidationSchema: Yup.SchemaOf<SecurityValues> = Yup.object({
  answer: Yup.string().required().label('Secure answer'),
  question: Yup.string().required().label('Security question'),
});

const WithdrawScene: FC = () => {
  const [loading] = useState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [amount, setAmount] = useState(5);
  const securityFormRef = useRef<any>();

  const withdrawValidationSchema: Yup.SchemaOf<WithDrawValues> = useMemo(
    () =>
      Yup.object({
        amount: Yup.number().required().min(5).max(100000).label('Amount'),
      }),
    [],
  );

  const handleSubmit = useCallback(() => {
    if (amount > 10000) {
      setIsFlagged(true);
      setIsConfirmOpen(false);

      return;
    }

    // TODO: Handle normal withdraw case
  }, [amount]);

  const handleSecureSubmit = useCallback(({ answer, question }: SecurityValues) => {
    // TODO: Verify answer/question
  }, []);

  return (
    <>
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
          You can withdraw a minimum of $5 and a maximum of $100000
        </Text>
      </Box>
      <Dialog
        loading={loading}
        title="Confirm Withdrawal"
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        ConfirmButton={
          <Button onClick={handleSubmit} isLoading={loading} disabled={loading}>
            Continue
          </Button>
        }>
        You are about to withdraw{' '}
        <Text fontWeight="500" as="span">
          {amount} USD
        </Text>
        . Do you confirm?
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
          <Form>
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
    </>
  );
};

export { WithdrawScene };
