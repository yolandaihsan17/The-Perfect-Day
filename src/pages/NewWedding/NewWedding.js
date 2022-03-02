import React from 'react'
import { useState, useRef } from "react";
import moment from 'moment';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';

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

import ImageList from '../../components/ImageList/ImageList'
import EventForm from '../../components/EventForm/EventForm';
import { getTemplateModel, ImageBBObject } from '../../model/wedding';
import { getTemplateEvent } from '../../model/event-template';
import compressImage from '../../utils/compress-image';
import saveToFirebase from '../../utils/wedding-save-data';
import OverlaySpinner from '../../components/Spinner/Spinner';
import uploadImage from '../../utils/upload-image';
import { useNavigate } from 'react-router-dom';


import './NewWedding.scss'

const Input = styled('input')({
  display: 'none',
});

const NewWedding = (props) => {
  const isEditMode = true
  const navigate = useNavigate()

  const [state, setState] = useState(getTemplateModel())

  const templateEvent = getTemplateEvent()

  const bg_image_local = useRef(false)
  const profile_pict_a_local = useRef(false)
  const profile_pict_b_local = useRef(false)
  const images_local = useRef(false)

  const [showSpinner, setShowSpinner] = useState(false)

  // FORM functions
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(<div>&nbsp;</div>)

  //IMAGE Zone
  function readImage(event) {
    let file = event.target.files[0];
    // if more than 10MB, then compress it first
    if (file.size > 10000000) {
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

    reader.onloadend = (e) => {
      const image = reader.result
      const resetPict = ImageBBObject()
      setState(prev => {
        return {
          ...prev,
          bg_image: { ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file }
        }
      })
      bg_image_local.current = true
      // setBackgroundImage({ ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file })
    }
  }

  function changeAvatar(event, target) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      const image = reader.result
      if (target === 'a') {
        const resetPict = ImageBBObject()
        // setProfilePictA({ ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file })
        setState(prev => {
          return {
            ...prev,
            profile_pict_a: { ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file }
          }
        })
        profile_pict_a_local.current = true
      } else {
        const resetPict = ImageBBObject()
        // setProfilePictB({ ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file })
        setState(prev => {
          return {
            ...prev,
            profile_pict_b: { ...resetPict, is_local: true, file_base64: image, title: file.filename, file: file }
          }
        })
        profile_pict_b_local.current = true
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
        filesArray.push({ file_base64: image, title: file.name, is_local: true, file: file })
        filesLoaded.current += 1

        console.log(filesArray)

        if (filesLoaded.current === files.length) {
          filesLoaded.current = 0
          images_local.current = true
          // setImagesArray(filesArray)
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
  }


  const uploadedImages = useRef([])
  const uploadedProfilePictA = useRef({})
  const uploadedProfilePictB = useRef({})
  const uploadedBgImage = useRef({})

  //UPLOADING
  async function save() {

    setShowSpinner(true)

    if (profile_pict_a_local) {
      //Upload Avatar
      const avatarA = await uploadImage(state.profile_pict_a.file)
      // profileA.current = avatarA.data
      // setProfilePictA(avatarA.data)
      uploadedProfilePictA.current = avatarA.data
      console.log('avatar a Uploaded', avatarA.data)
    }

    if (profile_pict_b_local) {
      const avatarB = await uploadImage(state.profile_pict_a.file)
      // profileB.current = avatarB.data
      // setProfilePictB(avatarB.data)
      uploadedProfilePictB.current = avatarB.data
      console.log('avatar b Uploaded', avatarB.data)
    }

    if (bg_image_local) {
      const bgImg = await uploadImage(state.bg_image.file)
      // bgImage.current = bgImg.data
      // setBackgroundImage(bgImg.data)
      uploadedBgImage.current = bgImg.data
      console.log('bg Image Uploaded', bgImg.data)
    }

    if (images_local) {
      //Upload Images
      let index = 0
      let tempArray = []
      for (let image of filesNew.current) {
        const result = await uploadImage(image)
        index++
        tempArray.push(result.data)
        uploadedImages.current = tempArray

        // if all images uploaded
        if (index === filesNew.current.length) {
          sendToFirebase()
        }
      }
    }
  }

  async function sendToFirebase() {

    const auth = getAuth()
    const user = auth.currentUser

    await saveToFirebase({
      ...state,
      id: nanoid(),
      user_id: user.uid,
      bg_image: JSON.stringify({ ...uploadedBgImage.current }),
      profile_pict_a: JSON.stringify({ ...uploadedProfilePictA.current }),
      profile_pict_b: JSON.stringify({ ...uploadedProfilePictB.current }),
      images: JSON.stringify({ ...uploadedImages.current })
    })
    setShowSpinner(false)
    navigate('/user-dashboard')
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
  }


  return (
    <div>
      {showSpinner && <OverlaySpinner />}
      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='opening' sx={{ backgroundImage: `url(${state.bg_image.is_local ? state.bg_image.file_base64 : state.bg_image.url})` }}>
        <div className="vignette"></div>

        <Typography variant='body' className='text-white' style={{ zIndex: '2' }}>The Wedding Of</Typography>
        <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'column'} className='names-container' gap={0}>
          <div className='item-container'>
            <Typography variant='h2' className='rancho pointer' id="name_a" >{state.name_a}</Typography>
            {isEditMode &&
              <IconButton onClick={() => handleClickOpen('name_a')} color='secondary' size='small' variant='contained' className='edit-button'>
                <EditIcon />
              </IconButton>
            }
          </div>
          <Typography variant='h1' className='rancho'>&</Typography>
          <div className='item-container'>
            <Typography variant='h2' className='rancho pointer' id='name_b'>{state.name_b}</Typography>
            {isEditMode &&
              <IconButton onClick={() => handleClickOpen('name_b')} color='secondary' size='small' variant='contained' className='edit-button'>
                <EditIcon />
              </IconButton>
            }
          </div>
        </Stack>
        <div className='item-container'>
          <Typography variant='body' className='text-white' style={{ zIndex: '2' }} id='mainDate'>{moment(state.main_date).format('dddd, DD MMMM YYYY')}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('mainDate', 'date')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>


        {isEditMode &&
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={readImage} />
            <Button startIcon={<PhotoCamera />} sx={{ mt: 8 }} aria-label="upload picture" component="span">Ganti Foto Utama</Button>
          </label>
        }

      </Stack>

      <Stack gap={2} alignItems={'center'} justifyContent={'center'} direction={'column'} className='wedding-detail'>
        <div className='item-container'>
          <Typography variant='h4' className='rancho'>{state.section_1_title}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('section_1_title')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>
        <div className='item-container'>
          <Typography variant='body' className='align-center pointer' id="welcome_words">{state.welcome_words}</Typography>
          {isEditMode &&
            <IconButton onClick={() => handleClickOpen('welcome_words')} color='secondary' size='small' variant='contained' className='edit-button'>
              <EditIcon />
            </IconButton>
          }
        </div>

        <Stack flexWrap={'wrap'} gap={6} alignItems={'center'} justifyContent={'space-evenly'} direction={'row'} sx={{ width: '100%', marginTop: '32px' }}>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }} alt={state.profile_pict_a.title} src={state.profile_pict_a.is_local ? state.profile_pict_a.file_base64 : state.profile_pict_a.url}></Avatar>
            <label htmlFor="ppA">
              <Input accept="image/*" id="ppA" type="file" onChange={(e) => changeAvatar(e, 'a')} />
              <IconButton color="primary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
                <PhotoCamera />
              </IconButton>
            </label>
            <div className='item-container'>
              <Typography variant='h3' className='rancho'>{state.name_a}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('name_a')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon />
                </IconButton>
              }
            </div>
            <div className='item-container'>
              <Typography variant='caption' className='pointer' id="description_text_a">{state.description_text_a}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('description_text_a')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon fontSize='1rem' />
                </IconButton>
              }
            </div>
          </Stack>
          <Typography variant='h2' className='person-container rancho' sx={{ textAlign: 'center' }}>&</Typography>
          <Stack gap={1} alignItems={'center'} justifyContent={'center'} direction={'column'} className='person-container'>
            <Avatar sx={{ width: 100, height: 100 }} alt={state.profile_pict_b.title} src={state.profile_pict_b.is_local ? state.profile_pict_b.file_base64 : state.profile_pict_b.url}></Avatar>
            <label htmlFor="ppB">
              <Input accept="image/*" id="ppB" type="file" onChange={(e) => changeAvatar(e, 'b')} />
              <IconButton color="primary" variant="contained" aria-label="upload picture" component="span" style={{ fontSize: '2rem' }}>
                <PhotoCamera />
              </IconButton>
            </label>
            <div className='item-container'>
              <Typography variant='h3' className='rancho'>{state.name_b}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('name_b')} color='secondary' size='small' variant='contained' className='edit-button'>
                  <EditIcon fontSize='1rem' />
                </IconButton>
              }
            </div>
            <div className='item-container'>
              <Typography variant='caption' className='pointer' id="description_text_b" onClick={handleClickOpen}>{state.description_text_b}</Typography>
              {isEditMode &&
                <IconButton onClick={() => handleClickOpen('description_text_b')} color='secondary' size='small' variant='contained' className='edit-button'>
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
              <Typography variant='caption' className='date'>{event.start_time} - {event.end_time} WIB</Typography>
              <Typography variant='body' className='place'>{event.place}</Typography>
              <Typography variant='body' className='address'>{event.address}</Typography>
              {isEditMode && <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                <Button onClick={() => editEvent(i)}> Edit </Button>
                <Button onClick={() => deleteEvent(i)}> Hapus </Button>
              </Stack>
              }
            </Stack>
          ])}

        </Stack>

        {isEditMode &&
          <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} style={{ height: '100%' }}>
            <Button onClick={addEvent}>Tambahkan Acara</Button>
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

        {isEditMode &&
          <Button onClick={save}>
            Simpan
          </Button>
        }


        <Dialog open={open} onClose={handleClose} disableScrollLock >
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
            {field}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('cancel')}>Batal</Button>
            <Button onClick={() => handleClose('submit')}>Simpan</Button>
          </DialogActions>
        </Dialog>

      </Stack>
    </div >
  )
}

export default NewWedding
