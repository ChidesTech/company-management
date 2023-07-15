import React from 'react';
import './App.css';
import Header from './components/admin/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServicesPage from './pages/admin/ServicesPage';
import LoginPage from './pages/website/LoginPage';
import UsersPage from './pages/admin/UsersPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RecordsPage from './pages/admin/RecordsPage';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DashboardPage from './pages/admin/DashboardPage';
import ExpensesPage from './pages/admin/ExpensesPage';
import Admin from './components/admin/Admin';
function App() {
  return (
    <BrowserRouter>
     <ToastContainer autoClose={1500} position={"top-right"}/>
  <Routes>
  <Route path='/services' element={<><Admin/><Header/><ServicesPage/></>} />
  <Route path='/records' element={<><Header/><RecordsPage/></>} />
  <Route path='/expenses' element={<><Header/><ExpensesPage/></>} />
  <Route path='/' element={<><LoginPage/></>} />
  <Route path='/users' element={<><Admin/><Header/><UsersPage/></>} />
  <Route path='/dashboard' element={<><Admin/><Header/><DashboardPage/></>} />
  </Routes>
    
    </BrowserRouter>
  );
}

export default App;
