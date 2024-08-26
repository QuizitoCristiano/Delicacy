import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/mylayouts';
import { MyHome } from '../pages/home';
import { SignIn } from '../componets/signin-in/signinIn';
import { SignUp } from '../componets/signUp/signUp';
import { AuthContext } from '../authcontext'; // Apenas AuthContext aqui

import { HomePage } from '../environments/helpers/history';
import { NewHelpeContato } from '../environments/complaint/helpeContato';
import { CustomerEvaluation } from '../environments/assessment/customerReview';
import { ForgotPassword } from '../recovery/recoverySenha';


// Definindo a rota protegida
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/SignIn" />;
};

// Configuração das rotas principais
export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                <Route path="/MyHome" element={<MyHome />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/NewHelpeContato" element={<NewHelpeContato />} />
                <Route path="/CustomerEvaluation" element={<CustomerEvaluation />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
