import * as teams from '@microsoft/teams-js';
import * as msal from 'msal';
// import ky from 'ky';

const getMoreInfo = (token) =>
  new Promise((resolve, reject) => {
    teams.getContext(async (context) => {
      console.log('context');
      console.log(context);

      resolve({
        name: context.userPrincipalName,
        email: context.userPrincipalName,
        tenantId: context.tid,
        token,
      });

      // try {
      //   const token = await ky
      //     .post('/api/auth', {
      //       json: {
      //         action: 'auth',
      //         tid: context.tid,
      //         token,
      //       },
      //     })
      //     .json();

      // } catch (error) {
      //   reject(error);
      // }
    });
  });

const getTeamsAuth = async () => {
  console.log('Teams Auth');

  const token = await new Promise((resolve, reject) => {
    teams.authentication.getAuthToken({
      successCallback: (token) => resolve(token),
      failureCallback: (error) => reject(error),
    });
  });

  const info = await getMoreInfo(token);
  console.log('info');
  console.log(info);

  return info;
};

const getMsalAuth = async () => {
  const msalInstance = new msal.UserAgentApplication({
    auth: { clientId: process.env.REACT_APP_AZURE_APP_ID },
  });

  const getToken = () =>
    msalInstance.acquireTokenSilent({
      scopes: ['email', 'profile'],
    });

  let response;
  const account = msalInstance.getAccount();
  if (account) {
    try {
      response = await getToken();
    } catch (e) {}
  }
  if (!response) {
    await msalInstance.loginPopup(['email', 'profile']);
    response = await getToken();
  }

  console.log(response);

  // await ky.get('https://graph.microsoft.com/beta/me/photos/48x48/$value', {
  //   headers: {
  //     Authorization: `Bearer ${response.accessToken}`,
  //   },
  // });

  return {
    name: response.account.name,
    email: response.account.userName,
    tenantId: response.tenantId,
    token: response.accessToken,
  };
};

export const getAuth = async () => {
  if (window.parent === window.self) {
    console.log('Probably not in Teams');
    return getMsalAuth();
  } else {
    console.log('Probably running in Teams');
    return getTeamsAuth();
  }
};
