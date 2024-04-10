import React, { useContext, useRef } from 'react'
import { MainLayout } from '../layouts/mylayouts'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigation,
} from 'react-router-dom'
import { MyHome } from '../pages/home'
import { SignIn } from '../componets/signin-in/signinIn'
import { AuthContext } from '../authcontext'
import { HomePage } from '../environments/helpers/history'
import { NewHelpeContato } from '../environments/complaint/helpeContato'
import { CustomerEvaluation } from '../environments/assessment/customerReview'

const myArrayLinks = ['/']
export const MainRoutes = () => {
  const pathname = useRef()
  const { isLoggedIn } = useContext(AuthContext)
  if (isLoggedIn && myArrayLinks.includes(pathname.current)) {
    return <Route path="/" element={<MyHome />} />
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/NewHelpeContato" element={<NewHelpeContato />} />
        <Route path='/CustomerEvaluation' element={<CustomerEvaluation />} />
      </Routes>
    </MainLayout>
  )
}
