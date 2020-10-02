import ky from 'ky';

import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import isWeekend from 'date-fns/isWeekend';
import isSameMonth from 'date-fns/isSameMonth';
import { fr } from 'date-fns/locale';

export const daysInMonth = (start) => {
  const weeks = eachWeekOfInterval(
    {
      start: start,
      end: endOfMonth(start),
    },
    { locale: fr, weekStartsOn: 1 }
  );
  return weeks.map((w) =>
    eachDayOfInterval(
      { start: w, end: endOfWeek(w, { locale: fr, weekStartsOn: 1 }) },
      { locale: fr, weekStartsOn: 1 }
    ).map((d) => ({
      date: d,
      open: !isWeekend(d) && isSameMonth(start, d),
    }))
  );
};

export const fetcher = (url) => ky.get(url).json();
