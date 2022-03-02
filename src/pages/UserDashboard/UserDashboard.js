import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import Layout from '../../template/Layout/Layout'
import { Typography } from '@mui/material'
import UndanganCard from '../../components/UndanganCard/UndanganCard'

import { getDataBasedUserId } from '../../utils/wedding-get-data'
import './UserDashboard.scss'

const contentContainer = {
    // height: '100vh',
    // backgroundColor: 'red',
    padding: '64px',
    // paddingLeft: '32px'
}


export default function UserDashboard() {
    const userId = "FANtP685VuhHq1Zl3V5bJTM0wtm1"

    const [data, setData] = React.useState([])

    useEffect(() => {
        getDataBasedUserId(userId).then(result => {
            let tempArray = []
            result.forEach(doc => {
                tempArray.push(doc.data())
                if (result.size === tempArray.length) {
                    setData(tempArray)
                    console.log(tempArray)
                }
            })
        })
    }, [])





    return (
        <Layout>
            <Stack className='content-container' flexWrap={'wrap'} gap={3} direction='column' alignItems={'stretch'} justifyContent={'center'}>
                <Typography variant="h4" className='extra-bold'>Hello, User</Typography>
                <Typography variant="subtitle" className=''>Incididunt dolor velit eiusmod sunt proident id dolore sit ad do ea pariatur laborum. Id do enim nisi excepteur aute. 
                Consequat dolore ipsum ipsum enim qui qui enim laborum ea nostrud. Consequat ut nulla quis sunt fugiat amet dolore eu aliquip cillum nostrud culpa. Incididunt dolor velit eiusmod sunt proident id dolore sit ad do ea pariatur laborum. Id do enim nisi excepteur aute. 
                Consequat dolore ipsum ipsum enim qui qui enim laborum ea nostrud. Consequat ut nulla quis sunt fugiat amet dolore eu aliquip cillum nostrud culpa.</Typography>

                <Typography variant="h6" className='extra-bold' style={{ marginTop: 32 }}>Koleksi Undanganmu</Typography>

                <Stack flexWrap={'wrap'} gap={1} direction='row' alignItems={'start'} justifyContent={'start'}>
                    {data && data.map((item, i) => {
                        return <UndanganCard key={i} data={item} type="normal" />
                    })
                    }

                    <UndanganCard type="add" />
                </Stack>
            </Stack>
        </Layout>
    )
}