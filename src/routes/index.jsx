import React, { useContext, useRef } from "react";
import { MainLayout } from "../layouts/mylayouts";
import { BrowserRouter, Routes, Route, Link, useNavigation } from 'react-router-dom';
import { MyHome } from "../pages/home";
import { SignIn } from "../componets/signin-in/signinIn";
import { AuthContext } from "../authcontext";

const myArrayLinks = [
    '/'
]
export const MainRoutes = () => {
    const pathname = useRef()
    const { isLoggedIn } = useContext(AuthContext)
    if (isLoggedIn && myArrayLinks.includes(pathname.current)) {
        return (

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MyHome />} />

                </Routes>
            </BrowserRouter>

        )

    }

    return (
        <MainLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MyHome />} />
                </Routes>
            </BrowserRouter>
        </MainLayout>
    )

}