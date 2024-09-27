// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Table from './pages/Table';
import BarMenu from './pages/Bar-Menu';
import Menus from './pages/menu/menu';
import Other from './pages/Other';
import Customer from './pages/customer/Customer';
import AddCustomer from './pages/customer/AddCustomer';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderPage from './pages/Order/Order';
import Categories from './pages/menu/categories';
import AddCategory from './pages/menu/AddCategory';
import AddMenuItem from './pages/menu/AddMenuItem';
import RestaurantTable from './pages/other/RestaurantTable';
import PaymentMethod from './pages/other/PaymentMethod';
import AddPaymentMethod from './pages/other/AddPaymentMethod';
import User from './pages/User'


function App() {
  return (
    
    <Router>
      <Header/>
      
      <div style={{ width: '95%', margin: '0 auto' }}>
        
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/table" element={<Table />} />
          <Route exact path="/bar-menu" element={<BarMenu />} />
          <Route exact path="/menu" element={<Menus />} />
          <Route exact path="/addMenuItem" element={<AddMenuItem />} />
          <Route exact path="/order-page/:tableId" element={<OrderPage />} />
          <Route exact path="/other" element={<Other />} />
          <Route exact path="/add-customer" element={<AddCustomer />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/customer" element={<Customer/>} />
          <Route exact path="/categories" element={<Categories/>} />
          <Route exact path="/addCategory" element={<AddCategory/>} />
          <Route exact path="/addMenu" element={<AddMenuItem/>} />
          <Route exact path="/restaurant-table" element={<RestaurantTable/>} />
          <Route exact path="/payment-method" element={<PaymentMethod/>} />
          <Route exact path="/add-payment-method" element={<AddPaymentMethod/>} />
          <Route exact path="/user" element={<User/>} />


          {/* Add more routes here as needed */}
        </Routes>
       
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;
