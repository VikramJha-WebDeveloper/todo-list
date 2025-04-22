import React, {useState} from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

// import Pages
import Home from "./pages/Home";
import About from './pages/About';
import Todo from './pages/Todo';


function App() {
  const colors = {
    orangeColor: "#FE7743",
    alabaster: "#EFEEEA",
    japaneseIndigo : "#273F4F",
    dark: "dark"
  }
  return (
    <>
    <BrowserRouter>
    <Navbar colors={colors}/>
      <Routes>
        <Route path="/" element={<Home colors={colors}/>}></Route>
        <Route path="/about" element={<About colors={colors}/>}></Route>
        <Route path="/todo" element={<Todo colors={colors}/>}></Route>
      </Routes>
      
      <Register colors={colors}/>
      <Login colors={colors}/>

      <ToastContainer theme="dark" position="top-center"/>
    </BrowserRouter>
    </>
  )
}

export default App