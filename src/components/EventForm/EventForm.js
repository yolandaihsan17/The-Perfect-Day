import React from 'react'
import { TextField } from '@mui/material'

export default function EventForm(props) {
  // const [state, setState] = React.useState(props.events)
  // const { name, place, address, startTime, endTime, date, mapLink } = props.state
  const propState = props.state

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
        label='Event Name'
        onChange={(e) => handleChange('name', e)}
      />
      <TextField
        autoFocus
        type="date"
        fullWidth
        variant="standard"
        label='Date'
        onChange={(e) => handleChange('date', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='Start Time'
        onChange={(e) => handleChange('startTime', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='End Time'
        onChange={(e) => handleChange('endTime', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.place}
        variant="standard"
        label='Place (ex: Building Name)'
        onChange={(e) => handleChange('place', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.address}
        variant="standard"
        label='Address'
        onChange={(e) => handleChange('address', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={propState.mapLink}
        variant="standard"
        label='Map Link (ex: google map link'
        onChange={(e) => handleChange('mapLink', e)}
      />
    </>)
}