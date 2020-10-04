module.exports = async function (context, req) {
  console.log(req);
  console.log(JSON.stringify(req.body));
  console.log('auth');
  const action = req.body.action;
  console.log(`action: ${action}`);
  const tenant = req.body.tid;
  console.log(`tenant: ${tenant}`);
  const token = req.body.token;
  console.log(`token: ${token}`);


  // const url = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
  // const params = {
  //     client_id: config.get("tab.appId"),
  //     client_secret: config.get("tab.appPassword"),
  //     grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
  //     assertion: token,
  //     requested_token_use: "on_behalf_of",
  //     scope: scopes.join(" ")
  // };

  // fetch(url, {
  //   method: "POST",
  //   body: querystring.stringify(params),
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  // }).then(result => {
  //   if (result.status !== 200) {
  //     result.json().then(json => {
  //       // TODO: Check explicitly for invalid_grant or interaction_required
  //       reject({"error":json.error});
  //     });
  //   } else {
  //     result.json().then(json => {
  //       resolve(json.access_token);
  //     });
  //   }
  // });

  context.res = {
    body: { ok: true },
  };
};
