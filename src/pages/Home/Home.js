import React from 'react'
// import { Link } from 'react-router-dom'
import Layout from '../../template/Layout/Layout'
// import { Stack } from '@mui/material'
import './Home.scss'
// import { Button } from '@mui/material'

import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Hero from '../../components/Hero/Hero';


const Home = (props) => {
  return (
    <div className='container'>
      <Layout>
        <Hero number={1054}/>
        <Container>
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
