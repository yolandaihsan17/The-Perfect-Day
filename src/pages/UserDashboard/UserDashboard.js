import React from 'react'
import { Stack } from '@mui/material'
import Layout from '../../template/Layout/Layout'
import { Typography } from '@mui/material'
import UndanganCard from '../../components/UndanganCard/UndanganCard'

const contentContainer = {
    // height: '100vh',
    // backgroundColor: 'red',
    paddingTop: '16px',
    // paddingLeft: '32px'
}

export default function UserDashboard() {
    return (
        <Layout>
            <Stack style={contentContainer} flexWrap={'wrap'} gap={3} direction='row' alignItems={'start'} justifyContent={'space-evenly'}>
                {/* <Typography variant="h5" className='extra-bold'>Hello, User</Typography>
                <Typography variant="caption" className=''>Sekarang, bikin undangan jauh lebih mudah</Typography> */}
                <UndanganCard />
                <UndanganCard />
                <UndanganCard />
            </Stack>
        </Layout>
    )
}