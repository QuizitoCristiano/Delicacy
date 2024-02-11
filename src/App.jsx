import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';



import { AuthProvider } from './authcontext';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes';

function App() {
  return (
  
    <AuthProvider>
        <BrowserRouter>
   
        <MainRoutes/>
        </BrowserRouter>
       
 
    

    </AuthProvider>
  );
}

export default App
