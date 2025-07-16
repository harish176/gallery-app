import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import AddImage from "./pages/AddImage"
import AddCategory from "./pages/AddCategory"
import Header from "./pages/Header"
function App() {


  return (
    <>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/add-category" element={<AddCategory/>}></Route>
      <Route path="/add-image" element={<AddImage/>}></Route>
    </Routes>
    </>
  )
}

export default App
