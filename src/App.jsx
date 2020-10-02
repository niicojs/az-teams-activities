import React from 'react'
import { Text, Stack } from '@chakra-ui/core';

import { Container } from './components/Container';
import MonthSelector from './components/MonthSelector';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <Container>
      <Stack width={['100%', '80%']} spacing="1rem" pt="4rem" px="1rem">
        <Text fontSize="2xl" fontWeight="bold">
          Mon Activites
        </Text>
        <MonthSelector />
        <Calendar />
      </Stack>
    </Container>
  );
};

export default App;
