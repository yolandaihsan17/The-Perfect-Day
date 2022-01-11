import React from 'react';
import './Hero.scss'
import { Typography } from '@mui/material';

export default function Hero(props) {

  return (
    <div className='hero'>
      {/* <img src={`https://unsplash.it/${width}/${height}?image=${props.number}`} style={style} /> */}
      <Typography variant='h1' className='extra-bold'>The Perfect Day</Typography>
    </div>
  )
}