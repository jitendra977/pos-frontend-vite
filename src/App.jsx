// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Table from './pages/Table';
import BarMenu from './pages/Bar-Menu';
import Menus from './pages/menu/menu';
import MobileDashboard from './pages/MobileDash';
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

function App() {
  return (
    
    <Router>
      <div className="container mt-4">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/mobile-home" element={<MobileDashboard />} />
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


          {/* Add more routes here as needed */}
        </Routes>
        
      </div>
      <Footer />
    </Router>
  );
}

export default App;
