import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './assets/styles.scss';
import { ThemeProvider } from '@mui/material/styles';
import { themeconfig } from './assets/themeConfig';

const Home = lazy(() => import('./pages/Home/Home'))

const theme = themeconfig

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress color="success" /></div>}>
            <Routes>
              <Route>
                <Route exact path='/' element={<Home />} />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
