import { Box, Button, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { GiCash } from 'react-icons/gi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiArrowLeftRightLine, RiLuggageDepositFill, RiUserFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { setBalance, setTransactions } from '../../../store/slices/account';
import { RootState } from '../../../store/types';
import { db } from '../../../utils/firebase';
import { DepositScene, HistoryScene, HomeScene, ProfileScene, WithdrawScene } from '../Scenes';
import { TransactionType } from '../types';
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
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe1 = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      const user = doc.data();
      dispatch(setBalance(user?.account.balance || 0));
    });

    const unsubscribe2 = onSnapshot(
      collection(db, 'users', currentUser.uid, 'transactions'),
      (snapShot) => {
        const transactions: TransactionType[] = [];

        snapShot.forEach((doc) => {
          const t = doc.data() as any;
          transactions.push({ ...t, id: doc.id, timestamp: dayjs(t.timestamp.toDate()).unix() });
        });

        dispatch(setTransactions(transactions));
      },
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [currentUser, dispatch]);

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
