const { daysInMonth } = require('./utils');

module.exports = async function (context, req) {
  console.log(req);
  const time = req.params.time;

  console.log(`Get data for ${time}`);

  const weeks = daysInMonth(new Date(+time));
  const days = {};

  for (const week of weeks) {
    for (const day of week) {
      if (day.open) {
        if (Math.random() > 0.5) {
          days[day.date.getTime()] = 1;
        }
      }
    }
  }

  context.res = {
    body: days,
  };
};
