import React from 'react';
import './App.css';
import { AuthProvider } from './authcontext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainRoutes } from './routes';

function App() {
  return (
    <AuthProvider> {/* Aqui o AuthProvider está no nível mais alto */}
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
