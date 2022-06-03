import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, ReactNode, useRef } from 'react';

const Dialog: FC<DialogProps> = ({
  cancelLabel,
  children,
  onClose,
  open,
  ConfirmButton,
  title,
  loading,
}) => {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        if (!loading) onClose();
      }}
      isOpen={open}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent height="fit-content" borderRadius="5px" w="500px">
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{children}</AlertDialogBody>
        <AlertDialogFooter display="flex" justifyContent="flex-end" gap="0.5em">
          <>
            <Button
              onClick={onClose}
              ref={cancelRef}
              bg="#f44"
              _hover={{ bg: '#e33' }}
              disabled={loading}>
              {cancelLabel}
            </Button>
            {ConfirmButton}
          </>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { Dialog };

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  cancelLabel?: string;
  ConfirmButton?: ReactNode;
  title: string;
  loading?: boolean;
}

Dialog.defaultProps = {
  cancelLabel: 'Cancel',
};
