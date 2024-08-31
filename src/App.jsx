import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact_us'
import Blog from './pages/Blog'
import Favourite from './pages/Favourite'
import Profil from './pages/Profil'
import Cart from './pages/Cart'
import Phones from './pages/Phones'
import Computers from './pages/Computers'
import Smartwatches from './pages/Smartwatches'
import Cameras from './pages/Cameras'
import Headphones from './pages/Headphones'
import Gaming from './pages/Gaming'
import BestCard from './components/pageComp/BestCard'
import Catalog from './pages/Catalog'
import PhoneSlug from './components/pageComp/PhoneSlug'
import ComputerSlug from './components/pageComp/ComputerSlug'

import CameraSlug from './components/pageComp/CameraSlug'
import HeadphoneSlug from './components/pageComp/HeadphoneSlug'
import GamingSlug from './components/pageComp/GamingSlug'
import PageNotFound from './components/PageNotFound'
import SmartwatchesSlug from './components/pageComp/SmartwatchesSlug'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact-us' element={<Contact />} />
        <Route path='/Blog' element={<Blog />} />
        <Route path='/Favourite' element={<Favourite />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Profile' element={<Profil />} />
        <Route path='/Phones' element={<Phones />} />
        <Route path='/Computers' element={<Computers />} />
        <Route path='/Smartwatches' element={<Smartwatches />} />
        <Route path='/Cameras' element={<Cameras />} />
        <Route path='/Headphones' element={<Headphones />} />
        <Route path='/Gaming' element={<Gaming />} />
        <Route path='/Bestsellers' element={<BestCard />} />
        <Route path='/Catalog' element={<Catalog />} />
        <Route path="/phones/:slug" element={<PhoneSlug />} />
        <Route path="/computers/:slug" element={<ComputerSlug />} />
        <Route path="/smartwatches/:slug" element={<SmartwatchesSlug />} />
        <Route path="/cameras/:slug" element={<CameraSlug />} />
        <Route path="/headphones/:slug" element={<HeadphoneSlug />} />
        <Route path="/gaming/:slug" element={<GamingSlug />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App