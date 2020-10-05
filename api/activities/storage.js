const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient({
  endpoint: process.env.COSMOSDB_ENDPOINT,
  key: process.env.COMSOSDB_KEY,
});

module.exports.saveActivityToStorage = async (month, day, activity) => {
  await client.database('Activities').container('Items').items.upsert({
    month,
    day,
    activity,
  });
};

module.exports.removeActivityToStorage = async (month, day) => {
  const querySpec = {
    query:
      'SELECT i.id, i.month FROM Items i where i.month = @month AND i.day = @day',
    parameters: [
      { name: '@month', value: month },
      { name: '@day', value: day },
    ],
  };

  const container = client.database('Activities').container('Items');
  const records = await container.items.query(querySpec).fetchAll();

  for (const record of records.resources) {
    await container.item(record.id, record.month).delete();
  }
};

module.exports.getMonthActivitiesFromStorage = async (month) => {
  // TODO add user
  const querySpec = {
    query: 'SELECT i.day, i.activity FROM Items i where i.month = @month',
    parameters: [{ name: '@month', value: month }],
  };

  const activites = await client
    .database('Activities')
    .container('Items')
    .items.query(querySpec)
    .fetchAll();

  const results = {};
  activites.resources.map((i) => (results[i.day] = i.activity));
  return results;
};
