import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

import { LoadingStatus } from '../../types/types';

const Spinner = ({ loadingStatus }: { loadingStatus: LoadingStatus }) => {
  if (loadingStatus === LoadingStatus.loading) {
    return (
      <Box sx={{ display: 'flex', m: 5 }}>
        <CircularProgress data-testid='testSpinnerId' />
      </Box>
    );
  }
  return <></>;
};

export default Spinner;
