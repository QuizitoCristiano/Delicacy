import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


import { AuthProvider } from './authcontext';
import { MainRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
 
        <MainRoutes />

    </AuthProvider>
  );
}

export default App
