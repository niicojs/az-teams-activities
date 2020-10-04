import React from 'react';
import { useRecoilValue } from 'recoil';

import { Flex, Avatar, Box, Text } from '@chakra-ui/core';

import { stateAuthInfo } from '../state';

export default function User() {
  const authInfo = useRecoilValue(stateAuthInfo);
  if (!authInfo) return null;
  return (
    <Flex pos="absolute" top="1rem" right="1rem">
      <Avatar size="xs" />
      <Box ml="2">
        <Text>{authInfo.name}</Text>
      </Box>
    </Flex>
  );
}
