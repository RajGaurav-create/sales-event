import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ChatProcess from "./ChatProcess";
function AppRoutes() {
  return (
      <Routes>
     <Route path="/" element={<LoginPage/>} />
     <Route path="register" element={<RegisterPage/>} />
     <Route path='customerhome' element={<CustomerHomePage />} />
     <Route path="UserCartPage" element={<CartPage />} />
     <Route path="orders" element={<OrderPage />} />
     <Route path="admin" element={<AdminLogin />} />
     <Route path='admindashboard' element={<AdminDashboard />} />
     <Route path='/chat'  element={<ChatProcess/>} />
    </Routes>
  );
}

export default AppRoutes