import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { RecoilRoot } from 'recoil';
import { theme } from '@chakra-ui/core';
import * as teams from '@microsoft/teams-js';

import App from './App';

try {
  teams.initialize(() => console.log('Teams OK'));
} catch (e) {
  console.log('Error initializing Teams SDK');
  console.log(e);
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
