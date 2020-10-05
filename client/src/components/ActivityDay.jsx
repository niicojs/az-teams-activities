import React, { useState } from 'react';
import format from 'date-fns/format';
import { mutate } from 'swr';

import {
  Text,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  RadioGroup,
  Radio,
} from '@chakra-ui/core';
import ky from 'ky';

export default function ActivityDay({ day, month, activities }) {
  const [open, setOpen] = useState(false);
  const url = '/api/activities?month=' + month;
  const strday = format(day.date, 'yyyy-MM-dd');
  const onSelect = (activity) => {
    setTimeout(() => setOpen(false), 400);
    mutate(url, () =>
      ky.post(url, {
        json: {
          month,
          day: strday,
          activity,
        },
      })
    );
  };
  return (
    <Popover
      isOpen={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <PopoverTrigger>
        <Flex
          w="100%"
          h="4rem"
          bg={day.open ? 'blue.600' : 'gray.600'}
          justifyContent="center"
          alignItems="center"
          key={strday}
        >
          <Text color="white">
            {format(day.date, 'dd')}
            {activities[strday] ? '✔️' : null}
          </Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        bg="blue.800"
        borderColor="blue.800"
        color="white"
      >
        <PopoverHeader fontWeight="semibold">Activités</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <RadioGroup onChange={(e) => onSelect(e.target.value)}>
            <Radio value="off">Congés</Radio>
            <Radio value="truc">Truc</Radio>
            <Radio value="bidule">Bidule</Radio>
          </RadioGroup>
          {activities[strday] ? (
            <Button
              leftIcon="delete"
              mt="1rem"
              variantColor="blue"
              onClick={() => onSelect(null)}
            >
              Supprimer
            </Button>
          ) : null}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
