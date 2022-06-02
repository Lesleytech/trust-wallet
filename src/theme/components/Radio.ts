import { ComponentStyleConfig } from '@chakra-ui/react';

export const Radio: ComponentStyleConfig = {
  parts: ['label', 'control'],
  baseStyle: {
    label: {
      flex: 1,
      cursor: 'pointer',
    },
    control: {
      _focus: {
        boxShadow: 'none !important',
      },
    },
  },
  defaultProps: {
    colorScheme: 'primary',
  },
};
