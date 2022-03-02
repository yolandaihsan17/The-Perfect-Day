import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import { getAuth } from "firebase/auth";
import EventForm from '../../components/EventForm/EventForm';
import { getTemplateEvent } from '../../model/event-template';

const steps = [
  'Detail Acara',
  'Daftar Acara',
  'Foto',
];


export default function Login() {

  const [inProgress, setInProgress] = React.useState(false)
  const navigate = useNavigate();

  const auth = getAuth();

  const handleSubmit = (event) => {
    setInProgress(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const userData = {
      username: data.get('username'),
      password: data.get('password'),
    };
    console.log(userData)
  };

  //STEPPER ZONE
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  //============== END OF STEPPER ZONE



  const [events, setEvents] = React.useState([getTemplateEvent()])
  console.log(events)
  const templateEvent = getTemplateEvent()
  // EVENTS ZONE
  function handleEventChange() {
    console.log('yeah')
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Masukkan Detail Acara
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]} >
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <StepLabel>{label}</StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 &&
                    <div>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        placeholder='Hamka, S.S.T bin Hamko'
                        id="name_a"
                        label="Nama 1"
                        name="name_a"
                        autoComplete="name_a"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        placeholder='Zubaidar, S.T binti Zabidar'
                        id="name_b"
                        label="Nama 2"
                        name="name_b"
                        autoComplete="name_b"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="main_date"
                        label="Tanggal Acara Utama"
                        name="main_date"
                        autoComplete="main_date"
                        type={'date'}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        placeholder='Undangan & Acara'
                        id="section_1_title"
                        label="Judul Undangan"
                        name="section_1_title"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="welcome_words"
                        label="Kata Sambutan"
                        placeholder='Tuhan telah menciptakan segala sesuatu berpasangan, maka izinkan kami mengundang sekaligus mengharapkan doa restu dari bapak/ibu dalam acara pernikahan kami.'
                        name="welcome_words"
                        autoComplete="welcome_words"
                        multiline
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description_text_a"
                        label="Teks Deskripsi 1"
                        placeholder='Anak ke 1 dari Bapak Smith dan Ibu Smith'
                        name="description_text_a"
                        autoComplete="description_text_a"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description_text_a"
                        label="Teks Deskripsi 1"
                        placeholder='Anak ke 2 dari Bapak Jack dan Ibu Jack'
                        name="description_text_a"
                        autoComplete="description_text_a"
                      />
                    </div>
                  }


                  {activeStep === 1 &&
                    <div>
                      {events.map((a, index) => {
                        <EventForm key={index} eventChange={handleEventChange} state={a} />
                      })}
                    </div>
                  }

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}