import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import './Spinner.scss'

export default function OverlaySpinner() {

  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} gap={2} className='spinner-container'>
        <CircularProgress  size={50}/>
        <Typography variant='body' className='text'>Saving data...</Typography>
      </Stack>
    </>
  );
}
