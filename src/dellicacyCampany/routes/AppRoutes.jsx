import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../signin/signin";
import MyCardCampany from "../cardCampany/campany";
import { MainLayout } from "../layouts/mylayouts";

// Certifique-se de importar corretamente esses componentes


import { MeuCadastro } from "../signUp/SignUp";
import { ErrorPageNotFound } from "../companyNotification/PageNotFound";
import { AuthContext } from "../authcontext";
import { Pedidos } from "../pages/pedidos";
import { PasswordRecovery } from "../recovery/recoverySenha";
import { HomeCompany } from "../pages/home";
import { CreateProductItem } from "../assets/createProducts ";

  import {ComoFunciona} from "../../Introduction/owItWorks";
import ApexChart from "../componente/newCharts/Charts";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/" />;
};

export const AppRouters = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      {/* Rotas públicas */}
      {!isLoggedIn && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/MeuCadastro" element={<MeuCadastro />} />
          <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
          <Route path="*" element={<ErrorPageNotFound />} />
          
        </>
      )}

      {/* Rotas protegidas */}
      {isLoggedIn && (
        <Route
          path="/"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomeCompany/>}/>
                <Route path="/" element={<ComoFunciona/>}/>
                <Route path="/MyCardCampany" element={<MyCardCampany />} />
                <Route path="/CreateProductItem" element={<CreateProductItem />} />
                <Route path="/Pedidos" element={<Pedidos />} />
                <Route path="ApexChart" element={<ApexChart />} />
              </Routes>
            </MainLayout>
          }
        />
      )}

      {/* Página de erro */}
      <Route path="*" element={<ErrorPageNotFound />} />
    </Routes>
  );
};
