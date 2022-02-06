import React from 'react'
// import './Layout.scss'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import './Template1.scss'

import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import Box from '@mui/material/Box';
import ImageList from '../../../components/ImageList/ImageList'
import moment from 'moment';
import { Button } from '@mui/material';
import Parse from 'parse'
import { useParams } from "react-router-dom";


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Template1 = (props) => {
  // console.log({children})
  const background = 'https://images.pexels.com/photos/936225/pexels-photo-936225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  const { mode } = useParams();
  const isEditMode = mode === 'edit' ? true : false

  const [state, setState] = React.useState({
    welcomeWords: 'Hello welcome to our wedding',
    name1: 'Name 1',
    name2: 'Name 2',
    disableParent: false,
    parentA1: 'parent 1',
    parentA2: 'parent 2',
    parentB1: 'parent 3',
    parentB2: 'parent 4',
    mainDate: '2021-02-13T01:49:29+01:00',
    section1Title: 'Assalamualaikum Warahmatullahi Wabarakatuh',
    descriptionText1: 'Anak ke 1 dari Bapak Fulan & Ibu Fulanah',
    descriptionText2: 'Anak ke 3 dari Bapak Abdul & Ibu Abdul',
    events: [{
      name: 'Event 1',
      place: 'Event 1 place',
      address: 'Event 1 Address, No. 17, Indonesia',
      startTime: '',
      endTime: '',
      date: '2021-02-13T01:49:29+01:00',
      mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
    },
    {
      name: 'Event 2',
      place: 'Event 2 place',
      address: 'Event 2 Address, No. 17, Indonesia',
      startTime: '',
      endTime: '',
      date: '2021-02-13T01:49:29+01:00',
      mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
    }
    ]
  })

  const templateEvent = {
    name: 'New Event',
    place: 'New Event place',
    address: 'New Event Address, No. 17, Indonesia',
    startTime: '09.00',
    endTime: '18.00',
    date: '2021-02-13T01:49:29+01:00',
    mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
  }



  const eventForm = (index) => {
    return <>
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={state.events[index].name}
        variant="standard"
        label='Event Name'
        onChange={(e) => handleEventChange(index, 'name', e)}
      />
      <TextField
        autoFocus
        type="date"
        fullWidth
        variant="standard"
        label='Date'
        onChange={(e) => handleEventChange(index, 'date', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='Start Time'
        onChange={(e) => handleEventChange(index, 'startTime', e)}
      />
      <TextField
        autoFocus
        type="time"
        fullWidth
        variant="standard"
        label='End Time'
        onChange={(e) => handleEventChange(index, 'endTime', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={state.events[index].place}
        variant="standard"
        label='Place (ex: Building Name)'
        onChange={(e) => handleEventChange(index, 'place', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={state.events[index].address}
        variant="standard"
        label='Address'
        onChange={(e) => handleEventChange(index, 'address', e)}
      />
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder={state.events[index].mapLink}
        variant="standard"
        label='Map Link (ex: google map link'
        onChange={(e) => handleEventChange(index, 'mapLink', e)}
      />
    </>
  }

  function save() {
    (async () => {
      const wedding = new Parse.Object('wedding');
      wedding.set('userId', Parse.User.current().id);
      wedding.set('orderDate', new Date());
      wedding.set('templateName', 'template1');
      wedding.set('welcomeWords', state.welcomeWords);
      wedding.set('name1', state.name1);
      wedding.set('name2', state.name2);
      wedding.set('descriptionText1', state.descriptionText1);
      wedding.set('descriptionText2', state.descriptionText2);
      wedding.set('section1Title', state.section1Title);
      wedding.set('events', state.events);
      try {
        const result = await wedding.save();
        // Access the Parse Object attributes using the .GET method
        console.log('order created', result);
      } catch (error) {
        console.error('Error while creating order: ', error);
      }
    })();
  }

  // FORM functions

  const [open, setOpen] = React.useState(false);
  const [field, setField] = React.useState(<div>&nbsp;</div>)

  const handleClickOpen = (event) => {
    console.log(event.target.label)
    const id = event.target.id
    setField(
      <TextField
        autoFocus
        margin="dense"
        id={id}
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => handleChange(e, id)}
      />
    )
    setOpen(true);
  };

  function handleChange(event, id) {
    setState(prevState => {
      console.log(event.target.value, prevState[id])
      return {
        ...prevState,
        [id]: event.target.value
      }
    })
  }

  const handleClose = (resp) => {
    console.log(resp)
    setOpen(false);
  };

  const editEvent = (index, add = false) => {
    setField(eventForm(index))
    setOpen(true)
  }

  const handleEventChange = (index, field, event) => {
    const value = event.target.value
    const tempEvents = state.events
    tempEvents[index][field] = value
    setState(prev => {
      return { ...prev, events: tempEvents }
    })
  }

  const addEvent = () => {
    const tempEvent = state.events
    tempEvent.push(templateEvent)
    console.log(tempEvent)
    setState(prev => { return { ...prev, events: tempEvent } })
    // editEvent(state.events.length - 1, true)
  }

  const deleteEvent = (index) => {
    const tempEvents = state.events
    tempEvents.splice(index, 1)
    setState(prev => { return { ...prev, events: tempEvents } })
    console.log(tempEvents)
  }


  return (
    <div>
      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='opening' sx={{ backgroundImage: `url(${background})` }}>
        <div className="vignette"></div>
        <Typography variant='body' className='text-white' style={{ zIndex: '2' }}>The Wedding Of</Typography>
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'column'} className='names-container' gap={0}>
          <Typography variant='h2' className='rancho pointer' id="name1" onClick={handleClickOpen}>{state.name1}</Typography>
          <Typography variant='h1' className='rancho'>&</Typography>
          <Typography variant='h2' className='rancho pointer' id='name2' onClick={handleClickOpen}>{state.name2}</Typography>
        </Stack>
        <Typography variant='body' className='text-white' style={{ zIndex: '2' }} id='mainDate' onClick={handleClickOpen}>{moment(state.mainDate).format('dddd, DD MMMM YYYY')}</Typography>
      </Stack>

      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='wedding-detail' sx={{ backgroundImage: `url(${background})` }}>
        <Typography variant='h4' className='rancho'>{state.section1Title}</Typography>
        <Typography variant='body' className='align-center pointer' id="welcomeWords" onClick={handleClickOpen}>{state.welcomeWords}</Typography>

        <Stack flexWrap={'wrap'} gap={6} alignItems={'center'} justifyContent={'space-evenly'} direction={'row'} sx={{ width: '100%', marginTop: '32px' }}>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }}>H</Avatar>
            <Typography variant='h3' className='rancho'>{state.name1}</Typography>
            <Typography variant='caption' className='pointer' id="descriptionText1" onClick={handleClickOpen}>{state.descriptionText1}</Typography>
          </Stack>
          <Typography variant='h2' className='person-container rancho' sx={{ textAlign: 'center' }}>&</Typography>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }}>H</Avatar>
            <Typography variant='h3' className='rancho'>{state.name2}</Typography>
            <Typography variant='caption' className='pointer' id="descriptionText2" onClick={handleClickOpen}>{state.descriptionText2}</Typography>
          </Stack>
        </Stack>

        <Stack flexWrap={'wrap'} gap={2} alignItems={'flex-start'} justifyContent={'center'} direction={'row'} sx={{ width: '100%', maxWidth: '1140px', margin: '32px 0px' }}>
          {state.events.map((event, i) => [
            <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='schedule-container' key={i}>
              <Typography variant='h4' className='rancho'>{event.name}</Typography>
              <Typography variant='body' className='date'>{moment(event.date).format('dddd, DD MMMM YYYY')}</Typography>
              <Typography variant='caption' className='date'>{event.startTime} - {event.endTime} WIB</Typography>
              <Typography variant='body' className='place'>{event.place}</Typography>
              <Typography variant='body' className='address'>{event.address}</Typography>
              {isEditMode && <Button onClick={() => editEvent(i)}> Edit </Button>}
              {isEditMode && <Button onClick={() => deleteEvent(i)}> Delete </Button>}
            </Stack>
          ])}

        </Stack>

        <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} style={{ height: '100%' }}>
          <Button onClick={addEvent}>Add Event</Button>
        </Stack>

        <ImageList sx={{ margin: '32px auto' }} />

        <Button onClick={save}>
          Save
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
            {field}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('cancel')}>Cancel</Button>
            <Button onClick={() => handleClose('submit')}>Save</Button>
          </DialogActions>
        </Dialog>

      </Stack>
    </div>
  )
}

export default Template1
