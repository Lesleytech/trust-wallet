import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

const NavLink: FC<NavLinkProps> = ({ active, Icon, label, to }) => {
  return (
    <Flex
      as={Link}
      to={to}
      alignItems="center"
      bg={active ? 'white' : 'unset'}
      borderRadius="7px"
      gap="1em"
      px="1em"
      h="50px"
      position="relative"
      color={active ? 'primary.main' : '#fafaff'}>
      <Icon color="inherit" size="1.2em" />
      <Text lineHeight="1em" fontWeight="500">
        {label}
      </Text>
    </Flex>
  );
};

export { NavLink };

interface NavLinkProps {
  to: string;
  label: string;
  Icon: IconType;
  active?: boolean;
}
