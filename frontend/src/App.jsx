import './App.css'
import { ToastContainer } from 'react-toastify';

// import components
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

// import Pages
import Home from "./pages/Home";

function App() {

  return (
    <>
    <Navbar />
    <Register />
    <Login />
      <Home />



      <ToastContainer />
    </>
  )
}

export default App