import React from 'react'
import { useState, useEffect, useRef } from "react";
import moment from 'moment';
import Parse from 'parse'
import { useParams } from "react-router-dom";
import Compressor from 'compressorjs';
import axios from 'axios';
// import img

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import ImageList from '../../../components/ImageList/ImageList'
import EventForm from '../../../components/EventForm/EventForm';
import { getTemplateModel } from '../../../model/wedding';
import { getTemplateEvent } from '../../../model/event-template';
import compressImage from '../../../utils/compress-image';


import './Template2.scss'

const Input = styled('input')({
  display: 'none',
});

const Template2 = (props) => {
  // console.log({children})
  const { invId } = useParams();
  const isEditMode = props.editMode
  const currentUser = Parse.User.current()
  const [state, setState] = useState(getTemplateModel())

  const bgImageFile = useRef()
  const profilePictAFile = useRef()
  const profilePictBFile = useRef()


  const templateEvent = getTemplateEvent()

  // FORM functions
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(<div>&nbsp;</div>)

  useEffect(() => {
    getInvitationData()
  }, [])

  useEffect(() => {
    // getInvitationData()
    console.log(state)
  }, [state])

  function checkUser(invitationUserId) {
    if (currentUser.id !== invitationUserId) {
      return false
    } else {
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
            bgImage: object.get('bgImage'),
            events: object.get('events'),
            userId: object.get('userId'),
            ppA: object.get('profilePictA'),
            ppB: object.get('profilePictB'),
            images: object.get('images')
          })
        }
      } else {
        console.log('redirecting')
      }
    } catch (error) {
      console.error('Error while fetching wedding', error);
    }
  }

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


  //IMAGE Zone
  function readImage(event) {
    let file = event.target.files[0];
    // if more than 5MB, then compress it first
    if (file.size > 5000000) {
      compressImage(file).then(result => {
        file = result
        setBgImage(file)
      })
    } else {
      setBgImage(file)
    }
  }

  function setBgImage(file) {
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    bgImageFile.current = file

    reader.onloadend = (e) => {
      const image = reader.result
      setState(prev => {
        return {
          ...prev,
          backgroundImage: image,
        }
      })
    }
  }

  function changeAvatar(event, target) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      if (target === 'a') {
        profilePictAFile.current = file

        setState(prev => {
          const image = reader.result
          return {
            ...prev,
            ppA: image,
          }
        })
      } else {
        profilePictBFile.current = file
        setState(prev => {
          const image = reader.result
          return {
            ...prev,
            ppB: image,
          }
        })
      }
    }
  }


  const filesLoaded = useRef(0)
  const filesNew = useRef([])

  function setImages(event) {
    const files = event.target.files
    let filesArray = []


    const tempArray = []
    for (let file of files) {

      tempArray.push(file)

      const reader = new FileReader();
      const url = reader.readAsDataURL(file);

      reader.onloadend = (e) => {
        const image = reader.result
        filesArray.push({ img: image, title: file.name })
        filesLoaded.current += 1

        if (filesLoaded.current === files.length) {
          filesLoaded.current = 0
          setState(prev => {
            return {
              ...prev,
              images: filesArray
            }
          })
        }
      }
    }

    filesNew.current = tempArray

    // console.log('files array', filesArray, filesArray.length)

  }


  let uploadedImages = useRef([])

  let profileA = useRef({})
  let profileB = useRef({})
  let bgImage = useRef({})

  //PARSE FUNCTIONS
  async function save() {

    //Upload Avatar
    const avatarA = await uploadImage(profilePictAFile.current)
    profileA.current = avatarA.data
    console.log('avatar a Uploaded', avatarA.data)

    const avatarB = await uploadImage(profilePictBFile.current)
    profileB.current = avatarB.data
    console.log('avatar b Uploaded', avatarB.data)

    const backgroundImage = await uploadImage(bgImageFile.current)
    bgImage.current = backgroundImage.data
    console.log('bg Image Uploaded', backgroundImage.data)


    //Upload Images
    let index = 0
    let tempArray = []
    for (let image of filesNew.current) {
      const result = await uploadImage(image)
      index++
      tempArray.push(result.data)
      uploadedImages.current = tempArray

      // if all images uploaded
      if (index === filesNew.current.length) saveToParse()
    }
  }


  async function saveToParse() {
    const wedding = new Parse.Object('wedding');
    wedding.set('userId', Parse.User.current().id);
    wedding.set('orderDate', new Date());
    wedding.set('templateName', 'Template2');
    wedding.set('welcomeWords', state.welcomeWords);
    wedding.set('name1', state.name1);
    wedding.set('name2', state.name2);
    wedding.set('descriptionText1', state.descriptionText1);
    wedding.set('descriptionText2', state.descriptionText2);
    wedding.set('section1Title', state.section1Title);
    wedding.set('events', state.events);
    wedding.set('mainDate', state.mainDate);
    wedding.set('profilePictA', profileA.current);
    wedding.set('profilePictB', profileB.current);
    wedding.set('bgImage', bgImage.current);
    wedding.set('images', uploadedImages.current)
    try {
      const result = await wedding.save();
      // Access the Parse Object attributes using the .GET method
      console.log('order created', result);
    } catch (error) {
      console.error('Error while creating order: ', error);
    }
  }

  async function uploadImage(image) {
    let body = new FormData()
    body.set('key', 'd829fc600a8959409d9e433b97f87f32')
    body.append('image', image)

    const a = await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })

    return a.data
  }

  function deleteUploadedImage() {
    return new Promise((resolve, reject) => {
      let count = 0
      for (let image of uploadedImages.current) {
        axios({
          method: 'post',
          url: image.delete_url,
          data: null
        }).then(() => {
          count += 1
          if (count === uploadedImages.current.length) {
            resolve()
          }
        }).catch(() => {
          console.log('Failed to delete this image: ' + image.title)
          reject()
        })
      }
    })
  }


  return (
    <div>
      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='opening' sx={{ backgroundImage: `url(${state.bgImage.url})` }}>
        <div className="vignette"></div>

        {isEditMode &&
          <label htmlFor="icon-button-file" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <Input accept="image/*" id="icon-button-file" type="file" onChange={readImage} />
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
            <Avatar sx={{ width: 100, height: 100 }} alt={state.name1} src={state.ppA.display_url}></Avatar>
            <label htmlFor="ppA">
              <Input accept="image/*" id="ppA" type="file" onChange={(e) => changeAvatar(e, 'a')} />
              <IconButton color="primary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
                <PhotoCamera />
              </IconButton>
            </label>
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
            <Avatar sx={{ width: 100, height: 100 }} alt={state.name2} src={state.ppB.display_url}></Avatar>
            <label htmlFor="ppB">
              <Input accept="image/*" id="ppB" type="file" onChange={(e) => changeAvatar(e, 'b')} />
              <IconButton color="primary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
                <PhotoCamera />
              </IconButton>
            </label>
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

        {isEditMode &&
          <label htmlFor="images-array">
            <Input accept="image/*" id="images-array" type="file" onChange={setImages} multiple />
            <IconButton color="primary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
              <PhotoCamera />
            </IconButton>
          </label>
        }

        {state.images && <ImageList sx={{ margin: '32px auto' }} images={state.images} />}

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

export default Template2
