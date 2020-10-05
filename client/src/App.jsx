import React, { useEffect, useState } from 'react';
import { Text, Stack } from '@chakra-ui/core';
import { useSetRecoilState } from 'recoil';

import { Container } from './components/Container';
import MonthSelector from './components/MonthSelector';
import Calendar from './components/Calendar';
import Loading from './components/Loading';
import Error from './components/Error';
import User from './components/User';

import { getAuth } from './auth';
import { stateAuthInfo } from './state';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const setAuthInfo = useSetRecoilState(stateAuthInfo);

  useEffect(() => {
    (async () => {
      try {
        const auth = await getAuth();
        console.log(auth);
        setAuthInfo(auth);
        setLoading(false);
      } catch (e) {
        console.log('Error during auth');
        console.log(e);
        setError(e.toString());
      }
    })();
  }, [setAuthInfo]);

  return (
    <Container>
      <Stack width={['100%', '80%']} spacing="1rem" pt="4rem" px="1rem">
        <Text fontSize="2xl" fontWeight="bold">
          Mon Activites
        </Text>
        <Error msg={error} />
        <Loading loading={loading}>
          <MonthSelector />
          <Calendar />
          <User />
        </Loading>
      </Stack>
    </Container>
  );
};

export default App;
