import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './assets/styles.scss';
import { ThemeProvider } from '@mui/material/styles';
import { themeconfig } from './assets/themeConfig';
import Parse from 'parse'
import initFirebase from './utils/initialize-firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import ProtectedRoute from './utils/protected-route';

const Home = lazy(() => import('./pages/Home/Home'))
const Signup = lazy(() => import('./pages/Signup/Signup'))
const Login = lazy(() => import('./pages/Login/Login'))
const UserDashboard = lazy(() => import('./pages/UserDashboard/UserDashboard'))
const SelectTemplate = lazy(() => import('./pages/SelectTemplate/SelectTemplate'))
const Template1 = lazy(() => import('./template/Wedding/Template1/Template1'))
// const WeddingForm = lazy(() => import('./pages/WeddingForm/WeddingForm'))
const NewWedding = lazy(() => import('./pages/NewWedding/NewWedding'))

const theme = themeconfig




function App() {
  initFirebase()

  const auth = getAuth();
  // const [user, setUser] = React.useState({})

  const isLoggedIn = React.useRef({})

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = currentUser.uid;
      // ...

      console.log('user:', currentUser)
      // setUser(currentUser)
      isLoggedIn.current = true
    } else {
      // User is signed out
      // ...
      console.log('no user')
      isLoggedIn.current = false
    }
  });

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
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user-dashboard' element={<UserDashboard />} />
                <Route path='/select-template' element={<SelectTemplate />} />
                {/* <Route exact path='/view/:invId' element={<Template1 editMode={false} />} /> */}
                {/* <Route exact path='/add-wedding' element={<Template1 editMode={true} />} /> */}
                <Route path='/add-wedding' element={<ProtectedRoute auth={isLoggedIn} > <NewWedding /> </ProtectedRoute>} />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
