import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './Layout.scss'


const Layout = (props) => {
  // console.log({children})
  return (
    <div >
      {!props.noHeader && <Navbar />}
      <div>
        {props.children}
      </div>
      {!props.noFooter && <Footer />}
    </div>
  )
}

export default Layout
