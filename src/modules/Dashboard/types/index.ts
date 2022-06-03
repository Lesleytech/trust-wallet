export interface UserType {
  fullName: string;
  email: string;
  uid: string;
}

export interface TransactionType {
  amount: number;
  type: 'deposit' | 'withdrawal';
  timestamp: number;
  id: string;
}
