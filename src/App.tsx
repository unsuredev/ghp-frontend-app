import React from 'react';
import Routes from './Routes';
import { ToastProvider } from './Common/ToastProvider';
import { ThemeProvider } from '@material-ui/core';
import { THEME } from './Styles';
import { ConfirmDialogProvider } from './Common/ConfirmDialogProvider';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <ConfirmDialogProvider>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </ConfirmDialogProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
