import { atom } from 'recoil';
import startOfMonth from 'date-fns/startOfMonth';

export const currentMonth = atom({
  key: 'currentMonth',
  default: startOfMonth(new Date()),
});
