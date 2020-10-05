const {
  saveActivityToStorage,
  getMonthActivitiesFromStorage,
  removeActivityToStorage,
} = require('./storage');

const getActivities = async (context, req) => {
  const month = req.query.month;
  console.log(`Get data for ${month}`);

  const records = await getMonthActivitiesFromStorage(month);
  context.res = {
    body: records,
  };
};

const setActivity = async (context, req) => {
  const month = req.query.month;
  const day = req.body.day;
  const activity = req.body.activity;
  if (activity) {
    console.log(`Set activity for ${day}: ${activity}`);
    await saveActivityToStorage(month, day, activity);
  } else {
    console.log(`Remove activity for ${day}`);
    await removeActivityToStorage(month, day);
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
