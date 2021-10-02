import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// function sendVital(vitals){
//   const body = JSON.stringify(vitals)
//   fetch(
//     "/main_api/vitals", 
//     {body, method: "POST", keepalive: true}
//   );
// }

reportWebVitals()