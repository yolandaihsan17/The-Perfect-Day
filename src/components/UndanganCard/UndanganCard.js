import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import './UndanganCard.scss'

export default function UndanganCard() {

  return (
    <>
      <Stack alignItems={'start'} justifyContent={'start'} direction={'column'} gap={1} className='card'>
        <img className='bg-image' src='https://images.pexels.com/photos/3916019/pexels-photo-3916019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'/>
      </Stack>
    </>
  );
}
