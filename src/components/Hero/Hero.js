import React from 'react';
import './Hero.scss'
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';

export default function Hero(props) {
  const height = window.innerHeight
  const width = window.innerWidth

  return (
    <div className='hero-container'>
      {/* <img src={`https://unsplash.it/${width}/${height}?image=${props.number}`} style={style} /> */}
      <img src={`https://images.pexels.com/photos/9703865/pexels-photo-9703865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=${height}&w=${width}`} className='background' alt='the perfect day background'/>
      <Stack alignItems={'start'} justifyContent={'start'} direction={'column'} style={{ padding: '16px' }}>
        <Typography variant='h1' className='extra-bold big-title'>The Perfect Day</Typography>
        <Typography variant='subtitle' className='big-title'>share your perfect day with people you love</Typography>
      </Stack>
    </div>
  )
}