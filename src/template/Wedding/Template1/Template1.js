import React from 'react'
// import './Layout.scss'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import './Template1.scss'

import Avatar from '@mui/material/Avatar';
// import PlaceIcon from '@mui/icons-material/Place';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';


// import Box from '@mui/material/Box';
import ImageList from '../../../components/ImageList/ImageList'
import moment from 'moment';
import { Button } from '@mui/material';
import Parse from 'parse'
import { useParams } from "react-router-dom";


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

import EventForm from '../../../components/EventForm/EventForm';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import { getTemplateModel } from '../../../model/wedding';

const Input = styled('input')({
  display: 'none',
});

const Template1 = (props) => {
  // console.log({children})
  const { invId } = useParams();
  const isEditMode = props.editMode
  const currentUser = Parse.User.current()
  const [state, setState] = React.useState(getTemplateModel())

  React.useEffect(() => {
    getInvitationData()
  }, [])

  // React.useEffect(()=> {
  //   checkUser()
  // }, [state.userId])

  function checkUser(invitationUserId) {
    console.log('a', currentUser.id, invitationUserId)
    if (currentUser.id != invitationUserId) {
      console.log('not same', currentUser.id, invitationUserId)
      return false
    } else {
      console.log('nice', currentUser.id, invitationUserId)
      return true
    }
  }


  async function getInvitationData() {
    const wedding = Parse.Object.extend('wedding');
    const query = new Parse.Query(wedding);
    query.equalTo('objectId', invId);
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    try {
      const results = await query.find();
      const userId = results[0].get('userId')
      const isSameUser = checkUser(userId)

      if (isSameUser) {
        for (const object of results) {
          setState({
            welcomeWords: object.get('welcomeWords'),
            name1: object.get('name1'),
            name2: object.get('name2'),
            mainDate: object.get('mainDate'),
            section1Title: object.get('section1Title'),
            descriptionText1: object.get('descriptionText1'),
            descriptionText2: object.get('descriptionText2'),
            backgroundImage: object.get('backgroundImage')._url,
            events: object.get('events'),
            userId: object.get('userId')
          })
        }
      } else {
        console.log('redirecting')
      }


    } catch (error) {
      console.error('Error while fetching wedding', error);
    }
  }






  const templateEvent = {
    name: 'New Event',
    place: 'New Event place',
    address: 'New Event Address, No. 17, Indonesia',
    startTime: '09.00',
    endTime: '18.00',
    date: '2021-02-13T01:49:29+01:00',
    mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
  }

  // FORM functions
  const [open, setOpen] = React.useState(false);
  const [field, setField] = React.useState(<div>&nbsp;</div>)

  const handleClickOpen = (field, type = 'text') => {
    setField(
      <TextField
        autoFocus
        margin="dense"
        id={field}
        label={'Edit this field'}
        type={type}
        fullWidth
        variant="standard"
        onChange={(e) => handleChange(e, field)}
      />
    )
    setOpen(true);
  };

  function handleChange(event, field) {
    setState(prevState => {
      console.log(event.target.value, prevState[field])
      return {
        ...prevState,
        [field]: event.target.value
      }
    })
  }

  const handleClose = (resp) => {
    console.log(resp)
    setOpen(false);
  };

  const editEvent = (index) => {
    setField(<EventForm state={state.events[index]} eventChange={(e) => eventChange(index, e)} />)
    setOpen(true)
  }

  const eventChange = (index, event) => {
    const tempEvents = state.events
    tempEvents[index] = event
    console.log(tempEvents)

    setState(prevState => {
      return {
        ...prevState,
        events: tempEvents
      }
    })
  }

  const addEvent = () => {
    const tempEvent = state.events
    tempEvent.push(templateEvent)
    setState(prev => { return { ...prev, events: tempEvent } })
    editEvent(state.events.length - 1, true)
  }

  const deleteEvent = (index) => {
    const tempEvents = state.events
    tempEvents.splice(index, 1)
    setState(prev => { return { ...prev, events: tempEvents } })
    console.log(tempEvents)
  }

  function setBackgroundImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setState(prev => {
        const image = reader.result
        return {
          ...prev,
          backgroundImage: image,
          parseBgImage: file,
          parseBgImageName: `${currentUser.id}-bg_image-${file.name}`
        }
      })
    }
  }


  //PARSE FUNCTIONS
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
      console.log('before sending', state.parseBgImage)
      wedding.set('backgroundImage', new Parse.File(state.parseBgImageName, state.parseBgImage));
      try {
        const result = await wedding.save();
        // Access the Parse Object attributes using the .GET method
        console.log('order created', result);
      } catch (error) {
        console.error('Error while creating order: ', error);
      }
    })();
  }


  return (
    <div>
      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='opening' sx={{ backgroundImage: `url(${state.backgroundImage})` }}>
        <div className="vignette"></div>

        {isEditMode &&
          <label htmlFor="icon-button-file" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <Input accept="image/*" id="icon-button-file" type="file" onChange={setBackgroundImage} />
            <IconButton color="secondary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
              <PhotoCamera />
            </IconButton>
          </label>
        }

        <Typography variant='body' className='text-white' style={{ zIndex: '2' }}>The Wedding Of</Typography>
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'column'} className='names-container' gap={0}>
          <div className='item-container'>
            <Typography variant='h2' className='rancho pointer' id="name1" >{state.name1}</Typography>
            {isEditMode &&
              <IconButton onClick={() => handleClickOpen('name1')} color='secondary' size='small' variant='contained' className='edit-button'>
                <EditIcon />
              </IconButton>
            }
          </div>
          <Typography variant='h1' className='rancho'>&</Typography>
          <div className='item-container'>
            <Typography variant='h2' className='rancho pointer' id='name2'>{state.name2}</Typography>
            {isEditMode &&
              <IconButton onClick={() => handleClickOpen('name2')} color='secondary' size='small' variant='contained' className='edit-button'>
                <EditIcon />
              </IconButton>
            }
          </div>
        </Stack>
        <div className='item-container'>
          <Typography variant='body' className='text-white' style={{ zIndex: '2' }} id='mainDate'>{moment(state.mainDate).format('dddd, DD MMMM YYYY')}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('mainDate', 'date')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>

      </Stack>

      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='wedding-detail'>
        <div className='item-container'>
          <Typography variant='h4' className='rancho'>{state.section1Title}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('section1Title')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>
        <div className='item-container'>
          <Typography variant='body' className='align-center pointer' id="welcomeWords">{state.welcomeWords}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('welcomeWords')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>

        <Stack flexWrap={'wrap'} gap={6} alignItems={'center'} justifyContent={'space-evenly'} direction={'row'} sx={{ width: '100%', marginTop: '32px' }}>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }}>H</Avatar>
            <div className='item-container'>
              <Typography variant='h3' className='rancho'>{state.name1}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('name1')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon />
                </IconButton>
              }
            </div>
            <div className='item-container'>
              <Typography variant='caption' className='pointer' id="descriptionText1">{state.descriptionText1}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('descriptionText1')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon fontSize='1rem' />
                </IconButton>
              }
            </div>
          </Stack>
          <Typography variant='h2' className='person-container rancho' sx={{ textAlign: 'center' }}>&</Typography>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }}>H</Avatar>
            <div className='item-container'>
              <Typography variant='h3' className='rancho'>{state.name2}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('name2')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon fontSize='1rem' />
                </IconButton>
              }
            </div>
            <div className='item-container'>
              <Typography variant='caption' className='pointer' id="descriptionText2" onClick={handleClickOpen}>{state.descriptionText2}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('descriptionText2')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon fontSize='1rem' />
                </IconButton>
              }
            </div>
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
              {isEditMode && <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                <Button onClick={() => editEvent(i)}> Edit </Button>
                <Button onClick={() => deleteEvent(i)}> Delete </Button>
              </Stack>
              }
            </Stack>
          ])}

        </Stack>

        {isEditMode &&
          <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} style={{ height: '100%' }}>
            <Button onClick={addEvent}>Add Event</Button>
          </Stack>
        }

        <ImageList sx={{ margin: '32px auto' }} />

        <Button onClick={save}>
          Save
        </Button>

        <Dialog open={open} onClose={handleClose} disableScrollLock >
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
            {field}


            {/* <EventForm state={state}/> */}

          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('cancel')}>Cancel</Button>
            <Button onClick={() => handleClose('submit')}>Save</Button>
          </DialogActions>
        </Dialog>

      </Stack>
    </div >
  )
}

export default Template1
