import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import MapView from './pages/MapView';
import Footer from './components/Footer';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import License from './pages/License';
import Imprint from './pages/Imprint';
import CookiesPolicy from './pages/CookiesPolicy';
import Payment from './pages/Payment';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/payment/:listingId' element={<Payment />} />
        <Route path='/map-view' element={<MapView />} />
        <Route path='/terms-of-use' element={<TermsOfUse />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/license' element={<License />} />
        <Route path='/imprint' element={<Imprint />} />
        <Route path='/cookies-policy' element={<CookiesPolicy />} />

        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          {/* Removed MyFavorites route as per user request */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
