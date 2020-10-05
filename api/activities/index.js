const format = require('date-fns/format');
const { daysInMonth } = require('./utils');

const getActivities = async (context, req) => {
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

const setActivity = async (context, req) => {
  const day = req.body.day;
  console.log(`Set activity for ${day}`);
  const activity = req.body.activity;
  if (activity) {
    // set
  } else {
    // delete
  }

  return getActivities(context, req);
};

module.exports = function (context, req) {
  if (req.method === 'GET') {
    return getActivities(context, req);
  } else if (req.method === 'POST') {
    return setActivity(context, req);
  }
};
