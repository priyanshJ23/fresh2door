import React from 'react'
import Appo from './Appo'
import './index.css'
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Newproduct from './pages/Newproduct';
import Signup from './pages/Signup';
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from './pages/Cart';
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Appo />}>
      <Route index element={<Home />}/>
      <Route path="menu/:filterby" element={<Menu/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="newproduct" element={<Newproduct/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="cart" element={<Cart/>}/>
      </Route>
     </Routes>
     </div>
  );
}

export default App; // Export the App component as default
