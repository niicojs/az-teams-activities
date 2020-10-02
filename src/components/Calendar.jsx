import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import { Stack, Grid } from '@chakra-ui/core';

import ActivityDay from './ActivityDay';

import { currentMonth } from '../state';
import { daysInMonth, fetcher } from '../utils';

export default function Calendar(props) {
  const month = useRecoilValue(currentMonth);
  const weeks = daysInMonth(month);
  const { data } = useSWR('/api/activities/' + month.getTime(), fetcher, {
    initialData: {},
    revalidateOnMount: true,
  });
  return (
    <Stack {...props}>
      <Stack mt="2rem">
        {weeks.map((week) => (
          <Grid
            templateColumns="repeat(7,2fr)"
            gap={3}
            key={week[0].date.getTime()}
          >
            {week.map((day) => (
              <ActivityDay
                key={day.date.getTime()}
                day={day}
                activities={data}
              />
            ))}
          </Grid>
        ))}
      </Stack>
    </Stack>
  );
}
