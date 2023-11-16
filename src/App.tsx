import React, { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import Home from './components/Home';
import Reauth from './components/reauth/Reauth';
import { loginRequest } from './authConfig';
import './custom.css';

const App = () => {
const { instance, accounts } = useMsal();

     const isAuthenticated = true;
     const handleLogin = () => {
         instance
             .loginRedirect(loginRequest)
             .catch((e) => {
                 console.log(e);
             })
             .then((data: any) => {
                console.log(data);
                 console.log(accounts);
                 // RequestProfileData();
             });
     };
     useEffect(() => {
         if (!isAuthenticated) {
             handleLogin();
         }

         setInterval(() => {
             console.log(accounts);
         }, 250);
    }, [isAuthenticated]);

//return <>{isAuthenticated ? <Home /> : <Reauth handleLogin={handleLogin} />}</>;
return <Home />

}



export default App;
