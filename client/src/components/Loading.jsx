import React from 'react';
import { CircularProgress } from '@chakra-ui/core';

export default function Loading({ children, loading }) {
  if (loading) {
    return <CircularProgress isIndeterminate size="100px" mt="2rem" />;
  } else {
    return children;
  }
}
