import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import { DetailsPages } from './pages/details/DetailsPages';
import { Account } from './pages/account/Account';
import Create from './components/create/Create';
import { Context } from './context/Context';
import Home from './pages/home/Home';
import About from "./pages/about/Abouts";
import Blogs from './pages/Blog/Blogs';
import Contact from './pages/contact/Contact';

export const App = () => {
  const { user } = useContext(Context)
  return (
    <>
       <Router>
        <Routes>
          <Route path = '/' exact element={<Home />} />
          <Route path = '/login' exact element={<Login />} />
          <Route path = '/register' exact element={<Register />} />
          <Route path = '/details/:id' exact element={<DetailsPages />} />
          <Route path = '/account' exact element={<Account />} />
          <Route path = '/create' exact element={<Create />} />
          <Route path = '/blog' exact element={<Blogs />} />
          <Route path = '/contact' exact element={<Contact />} />
          <Route path = '/about' exact element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App