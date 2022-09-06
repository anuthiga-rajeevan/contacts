import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import NotFound from './pages/notFound/NotFound';
import Contacts from './pages/contact/Contacts';
import AddContact from './pages/contact/AddContact';
import Alert from './components/alert/Alert';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* @ts-ignore */}
      <Alert />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
