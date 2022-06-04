import { TransactionType, UserType } from '../../modules/Dashboard/types';

export interface RootState {
  auth: { currentUser: UserType | null };
  account: {
    loading: boolean;
    balance: number;
    transactions: TransactionType[];
    cardNumber: string;
  };
}
