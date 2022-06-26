import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from "react";
import Login from './components/Login';
import AddContact from './components/AddContact';
import Register from './components/Register';
import ViewContacts from './components/ViewContacts';
import Map from './components/Map';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <div className="App" id = "app">

        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/addContact" element={<AddContact />}></Route>
        <Route path="/viewContacts" element={<ViewContacts />}></Route>
        <Route path="/map" element={<Map />}></Route>

        </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
