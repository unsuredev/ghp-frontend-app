import React from 'react';
import Routes from './Routes';
import { ToastProvider } from './Common/ToastProvider';
import { ThemeProvider } from '@material-ui/core';
import { THEME } from './Styles';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
