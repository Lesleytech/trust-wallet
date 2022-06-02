import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '500',
    borderRadius: 'base',
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    sm: {
      fontSize: ['14px', '16px', '16px'],
      px: '1em',
      py: '1.0001em',
    },
    md: {
      fontSize: '0.9rem',
      height: '35px',
      minW: '100px',
    },
    lg: {
      fontSize: ['20px', '24px', '24px'],
      px: '3em',
      py: '1.3339em',
    },
  },
  variants: {
    outline: {
      border: '1.7px solid',
      borderColor: 'primary.main',
      color: 'primary.main',
      _hover: {
        bg: 'gray.100',
      },
    },
    solid: {
      bg: 'primary.main',
      color: 'white',
      _hover: {
        bg: 'primary.dark',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
