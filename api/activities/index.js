const format = require('date-fns/format');
const { daysInMonth } = require('./utils');

module.exports = async function (context, req) {
  console.log(req);
  const month = req.query.month;

  console.log(`Get data for ${month}`);

  const weeks = daysInMonth(new Date(month));
  const days = {};

  for (const week of weeks) {
    for (const day of week) {
      if (day.open) {
        if (Math.random() > 0.5) {
          days[format(day.date, 'yyyy-MM-dd')] = 1;
        }
      }
    }
  }

  context.res = {
    body: days,
  };
};
