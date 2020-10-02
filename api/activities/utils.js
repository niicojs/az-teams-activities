const eachWeekOfInterval = require('date-fns/eachWeekOfInterval');
const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const endOfWeek = require('date-fns/endOfWeek');
const endOfMonth = require('date-fns/endOfMonth');
const isWeekend = require('date-fns/isWeekend');
const isSameMonth = require('date-fns/isSameMonth');
const { fr } = require('date-fns/locale');

module.exports.daysInMonth = (start) => {
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
