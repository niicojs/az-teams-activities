import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/core';

export default function Error({ msg }) {
  if (msg) {
    return (
      <Alert status="error">
        <AlertIcon />
        {msg}
      </Alert>
    );
  } else {
    return null;
  }
}
