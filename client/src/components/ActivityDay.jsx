import React from 'react'
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';

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
import { useState } from 'react';

export default function ActivityDay({ day, activities }) {
  const [open, setOpen] = useState(false);
  const save = () => {
    setOpen(false);
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
          key={'d' + day.date.getTime()}
        >
          <Text color="white">
            {format(day.date, 'dd', { locale: fr })}
            {activities[day.date.getTime()] ? '✔️' : null}
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
          <RadioGroup>
            <Radio value="off">Congés</Radio>
            <Radio value="truc">Truc</Radio>
            <Radio value="bidule">Bidule</Radio>
          </RadioGroup>
          <Button mt="1rem" variantColor="blue" onClick={save}>
            Sauvegarder
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
