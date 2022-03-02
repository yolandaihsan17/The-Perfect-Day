import React from 'react'
import { TextField } from '@mui/material'

export default function EventForm(props) {
  // const [state, setState] = React.useState(props.events)
  // const { name, place, address, startTime, endTime, date, mapLink } = props.state
  const propState = props.state

console.log('heeyyy')

  console.log(props)

  const handleChange = (field, event) => {
    propState[field] = event.target.value
    props.eventChange(propState)
  }

  return (
    <>
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.name}
        variant="standard"
        label='Nama Acara'
        onChange={(e) => handleChange('name', e)}
      />
      <TextField
        autoFocus
        type="date"
        fullWidth
        variant="standard"
        label='Tanggal'
        onChange={(e) => handleChange('date', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='Jam Mulai'
        onChange={(e) => handleChange('start_time', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='Jam Berakhir'
        onChange={(e) => handleChange('end_time', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.place}
        variant="standard"
        label='Tempat (contoh: Gedung Sate)'
        onChange={(e) => handleChange('place', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.address}
        variant="standard"
        label='Alamat'
        onChange={(e) => handleChange('address', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.map_link}
        variant="standard"
        label='Link Google Map (ex: google map link'
        onChange={(e) => handleChange('map_link', e)}
      />
    </>)
}