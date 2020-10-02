import React from 'react';
import { useRecoilState } from 'recoil';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import { fr } from 'date-fns/locale';

import { Text, Stack } from '@chakra-ui/core';
import { IconButton } from '@chakra-ui/core';

import { currentMonth } from '../state';

export default function MonthSelector(props) {
  const [month, setMonth] = useRecoilState(currentMonth);
  const precedent = () => setMonth(addMonths(month, -1));
  const suivant = () => setMonth(addMonths(month, 1));
  return (
    <Stack isInline {...props}>
      <IconButton size="sm" icon="chevron-left" onClick={precedent} />
      <Text fontSize="xl" minWidth="12rem" textAlign="center">
        {format(month, 'MMMM yyyy', { locale: fr })}
      </Text>
      <IconButton size="sm" icon="chevron-right" onClick={suivant} />
    </Stack>
  );
}
