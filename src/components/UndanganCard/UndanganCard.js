import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import './UndanganCard.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

export default function UndanganCard(props) {
  const navigate = useNavigate();

  const data = props.data

  const isAdd = props.type === 'add'

  const bg_image = !isAdd ? JSON.parse(props.data.bg_image) : ''

  function onClick() {
    if (isAdd) {
      navigate('/add-wedding')
    } else {
      navigate(`/edit/${data.id}`)
    }
  }

  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} gap={0} className={isAdd ? "card add" : 'card'} onClick={onClick}>
        {!isAdd && <img className='bg-image' src={bg_image.medium.url} />}
        {!isAdd && <div style={{ zIndex: '99' }} className={'card-title'}>{data.name_a} & {data.name_b}</div>}
        {isAdd && <AddCircleIcon fontSize='large' color='primary' />}
      </Stack>
    </>
  );
}
