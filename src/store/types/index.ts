import { UserType } from '../../modules/Dashboard/types';

export interface RootState {
  auth: { currentUser: UserType | null };
}
