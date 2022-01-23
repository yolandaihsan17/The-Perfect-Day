import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../template/Layout/Layout'
import { Stack } from '@mui/material'
import './Home.scss'
import { Button } from '@mui/material'

import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Hero from '../../components/Hero/Hero';
import Parse from 'parse'


const Home = (props) => {

  function checkLogin() {
    const isLoggedIn = Parse.User.current()
    console.log(isLoggedIn)
  }

  function logOut() {
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current();  // this will now be null
      console.log(currentUser)
    });
  }
  return (
    <div className='container'>
      <Layout>
        <Hero number={1054} />
        <Container>
          <Stack spacing={2} alignItems={'center'} justifyContent={'center'} direction={'row'}>
            <Button component={Link} to='/signup'>Sign Up</Button>
            <Button component={Link} to='/login'>Login</Button>
            <Button component={Link} to='/user-dashboard'>Dashboard</Button>
            <Button component={Link} to='/select-template'>Select Template</Button>
            <Button onClick={checkLogin}>Check if login</Button>
            <Button onClick={logOut}>Log Out</Button>
          </Stack>
          <Box sx={{ my: 2 }}>
            {[...new Array(40)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </Box>
        </Container>
      </Layout>
    </div>
  )
}

export default Home
