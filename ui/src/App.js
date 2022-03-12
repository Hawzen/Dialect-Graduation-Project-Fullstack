import React, { lazy, Suspense } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { blue } from '@material-ui/core/colors';

import { 
  ThemeProvider, 
  
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';


const Dialect = lazy(() => import("./dialect/dialect"));

export default function App() {
  return (
        <div className="App">
          <header className="App-body">
          
            <ThemeProvider theme={theme}>
              <Suspense fallback={<div>Loading...</div>}>
                <Dialect/>
              </Suspense>

            </ThemeProvider>
          </header>
        </div>
  );
}

// Style
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4C566A',
      main: blue[800],
      dark: '#2E3440',
    },
    secondary: {
      light: '#E5E9F0',
      main: '#D8DEE9' ,
      dark: '#D8DEE9',
    },
  },
});

