import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './assets/styles.scss';
import { ThemeProvider } from '@mui/material/styles';
import { themeconfig } from './assets/themeConfig';
import Parse from 'parse'

const Home = lazy(() => import('./pages/Home/Home'))
const Signup = lazy(() => import('./pages/Signup/Signup'))
const Login = lazy(() => import('./pages/Login/Login'))
const UserDashboard = lazy(() => import('./pages/UserDashboard/UserDashboard'))
const SelectTemplate = lazy(() => import('./pages/SelectTemplate/SelectTemplate'))

const theme = themeconfig

function App() {

  Parse.initialize('SvhdRkRZe1nabVjD1Mx4E1BgGQsyZ9rGibPrdAol', 'sZ4q0hWnXjK0SHC5EqCdroZqHW5JxSTquP55c49v')
  Parse.serverURL = 'https://parseapi.back4app.com/'

  return (
    <>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress color="success" /></div>}>
            <Routes>
              <Route>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/user-dashboard' element={<UserDashboard />} />
                <Route exact path='/select-template' element={<SelectTemplate />} />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
