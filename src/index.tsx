//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <MsalProvider instance={msalInstance}>
        {/* //<BrowserRouter basename={baseUrl !== null ? baseUrl : undefined}> */}
            <App />
        {/* </BrowserRouter> */}
    </MsalProvider>,
    rootElement
);

registerServiceWorker();
