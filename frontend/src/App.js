import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, List, ListItem, Divider } from 'react95';
import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import Public from './Views/Public/Public';
import Dashboard from './Views/Private/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Utils/PrivateRoutes';
import LocalNotes from './Views/Public/LocalNotes';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color:#398180;
  }
`;

const App = () => (
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Router>
        <Routes>
          <Route element={<Public />} path="/login" />
          <Route element={<Public />} path="/" />
          <Route element={<LocalNotes />} path="/local/notes" />

          <Route element={<PrivateRoutes />} >
            <Route element={<Dashboard />} path={'/dashboard'} />
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>


  </div>
);

export default App;