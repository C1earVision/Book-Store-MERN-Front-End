import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import NavBar from './components/NavBar'
import { useGlobalContext } from './context'
import Book from './pages/Book'
import ShowNavBar from './components/ShowNavBar'
import WishList from './pages/WishList'
import AdminPage from './pages/AdminPage'
import ModifyPage from './pages/ModifyPage'
import Footer from './components/Footer'
import About from './pages/About'
import ShowFooter from './components/ShowFooter'


function App() {

  return (
    <>
      <ShowNavBar>
        <NavBar />
      </ShowNavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllBooks />} />
        <Route path="/search">
          <Route index element={<Search />} />
          <Route path='products/:id' element={<Book />} />
          <Route path="products/:id/modify" element={<ModifyPage />} /> 
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist">
          <Route index element={<WishList />} />
          <Route path='products/:id' element={<Book />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="products/:id" element={<Book />} />
        <Route path="/products/:id/modify" element={<ModifyPage />} />        
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <ShowFooter>
        <Footer />
      </ShowFooter>
    </>
  )
}

export default App
