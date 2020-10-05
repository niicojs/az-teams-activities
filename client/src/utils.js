import ky from 'ky';
import joursFeries from '@socialgouv/jours-feries';

import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import isWeekend from 'date-fns/isWeekend';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import { fr } from 'date-fns/locale';

export const daysInMonth = (start) => {
  const feries = Object.values(joursFeries(start.getFullYear()));
  const estFerie = (date) => feries.some((elt) => isSameDay(elt, date));
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
      open: !estFerie(d) && !isWeekend(d) && isSameMonth(start, d),
    }))
  );
};

export const fetcher = (url) => ky.get(url).json();
