import { ComponentStyleConfig } from '@chakra-ui/react';

export const Input: ComponentStyleConfig = {
  baseStyle: {
    fontSize: '0.9rem !important',
  },
  variants: {
    filled: {
      field: {
        backgroundColor: 'primary.light',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
        _focus: {
          borderWidth: '2px',
        },
        _invalid: {
          borderColor: 'error',
        },
      },
    },
  },
  defaultProps: {
    focusBorderColor: 'primary.main',
    errorBorderColor: 'error',
  },
};
