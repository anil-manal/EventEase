import React from 'react'
import moduleName from 'module'
import { motion } from "framer-motion";
import Home from './page/Home'
import Details from './page/Details'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import CreateEvent from './page/CreateEvent';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Eventspage from './page/Eventspage';
import Feedback from './page/Feedback';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedFile from './protected/ProtectedFile';
import Profile from './user/Profile';
import PageNotFound from './component/PageNotFound';
import UserNavbar from './component/UserNavbar';
import PaymentPage from './page/PaymentPage';
import AdminPage from './admin/AdminPage';
import AdminNavbar from './component/AdminNavbar';
import OrgProfile from './organizer/orgProfile';
import OrganizerNavbar from './component/OrganizerNavbar';
import OrderRecord from './organizer/OrderRecord';
import QRScanner from './organizer/QrScanner';

const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        {/* common share pages routing  */}
        <Route element={<><Navbar /> <Outlet /><Footer /></>}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/eventsPage' element={<Eventspage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/details/:eventId' element={<Details />} />
        </Route>

        {/* Protected Pages Routing */}
        <Route path='/event' element={<ProtectedFile compo={<><Navbar /><Outlet /><Footer /></>} />}>
          <Route path='payment-event/:eventId' element={<PaymentPage />} />
        </Route>

        <Route path='/user-profile' element={<ProtectedFile compo={<><UserNavbar /><Outlet /><Footer /></>} />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path='/org' element={<ProtectedFile compo={<><OrganizerNavbar /><Outlet /><Footer /></>} />}>
          <Route index element={<OrgProfile />} />
          <Route path='record' element={<OrderRecord />} />
          <Route path='qr-scanner' element={<QRScanner />} />

          <Route path='create-event' element={<CreateEvent />} />
        </Route>

        <Route path='/admin' element={<ProtectedFile compo={<><AdminNavbar /><Outlet /><Footer /></>} />}>
          <Route index element={<AdminPage />} />
        </Route>



        {/* page not found */}
        <Route path='*' element={<PageNotFound />} />

      </Routes >




    </BrowserRouter >
  </>
}

export default App