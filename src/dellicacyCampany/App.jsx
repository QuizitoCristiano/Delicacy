import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./globalsAuthContext/index";
import { AuthProvider } from "./authcontext";
import { AppRouters } from "./routes/AppRoutes";

function App() {
  const { user } = useAuth() || {};

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouters/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;





