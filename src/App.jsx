import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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


function App() {
  const navigate = useNavigate()
  const {searchData, setSearchData, bookId, setBookId, userName, setUserName} = useGlobalContext();

  return (
    <>
      <ShowNavBar>
        <NavBar searchData={searchData} setSearchData={setSearchData} userName={userName} />
      </ShowNavBar>
      <Routes>
        <Route path="/" element={<Home setBookId={setBookId} bookId={bookId} />} />
        <Route path="/search">
          <Route index element={<Search setBookId={setBookId} searchData={searchData} setSearchData={setSearchData} />} />
          <Route path=':id' element={<Book bookId={bookId} setBookId={setBookId} />} />
        </Route>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/wishlist">
          <Route index element={<WishList setBookId={setBookId} bookId={bookId} />} />
          <Route path='books/:id' element={<Book bookId={bookId} setBookId={setBookId} />} />
        </Route>
        <Route path="/register" element={<Register setUserName={setUserName} />} />
        <Route path="books/:id" element={<Book bookId={bookId} setBookId={setBookId} />} />
        <Route path="/books/:id/modify" element={<ModifyPage />} />        
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
