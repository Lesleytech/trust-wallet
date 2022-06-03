import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { GiCash } from 'react-icons/gi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiArrowLeftRightLine, RiLuggageDepositFill, RiUserFill } from 'react-icons/ri';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { DepositScene, HistoryScene, HomeScene, ProfileScene, WithdrawScene } from '../Scenes';
import { NavLink } from './NavLink';

const navLinks = [
  {
    label: 'Dashboard',
    to: '/',
    Icon: MdSpaceDashboard,
  },
  {
    label: 'Recent Transactions',
    to: '/history',
    Icon: RiArrowLeftRightLine,
  },
  {
    label: 'Withdraw',
    to: '/withdraw',
    Icon: GiCash,
  },
  {
    label: 'Deposit',
    to: '/deposit',
    Icon: RiLuggageDepositFill,
  },
  {
    label: 'Profile',
    to: '/profile',
    Icon: RiUserFill,
  },
];

const headings = navLinks.reduce((obj, current) => {
  const { label, to } = current;

  return { ...obj, [to]: label };
}, {} as any);

const DashbaordLayout: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{headings[pathname]} | Trust Wallet</title>
      </Helmet>
      <Box
        minH="100vh"
        bg="gray.100"
        display="grid"
        gridTemplate="1fr / minmax(300px, 25vw) 1fr"
        gridTemplateAreas="'s m'"
        gap="1.5em"
        p="1.5em 2em">
        <Box gridArea="s" bg="primary.main" borderRadius="15px" px="1em" shadow="lg">
          <Box my="1.5em" px="1em">
            <Link to="/">
              <Text as="h2" m="0">
                Trust
                <Text color="#fafaff" as="span">
                  .Wallet
                </Text>
              </Text>
            </Link>
          </Box>
          <Box borderRadius="15px">
            {navLinks.map(({ Icon, label, to }, i) => (
              <NavLink Icon={Icon} label={label} to={to} key={i} active={pathname === to} />
            ))}
          </Box>
        </Box>
        <Box gridArea="m">
          <Box
            display="flex"
            p="0.5em 1.5em"
            alignItems="flex-end"
            justifyContent="space-between"
            mb="1.5em">
            <Text as="h1" m="0" pos="relative" top="0.25em">
              {headings[pathname]}
            </Text>
            <Flex alignItems="center" gap="0.5em">
              <Link to="/deposit">
                <Button>Deposit</Button>
              </Link>
              <Link to="withdraw">
                <Button>Withdraw</Button>
              </Link>
            </Flex>
          </Box>
          <Routes>
            <Route path="/" element={<HomeScene />} />
            <Route path="/history" element={<HistoryScene />} />
            <Route path="/withdraw" element={<WithdrawScene />} />
            <Route path="/deposit" element={<DepositScene />} />
            <Route path="/profile" element={<ProfileScene />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export { DashbaordLayout };
