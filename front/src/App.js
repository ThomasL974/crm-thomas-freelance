import './App.css';
import InvoiceList from './components/InvoiceList';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CustomerList from './components/CustomerList';
import Navbar from './components/Navbar';
import FormCustomer from './components/FormCustomer';
import FormInvoice from './components/FormInvoice';

function App() {
  return (
    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path='/' element={<InvoiceList />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/customers/create' element={<FormCustomer />} />
        <Route path='/invoices/create' element={<FormInvoice />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
