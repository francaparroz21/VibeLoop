import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Shop from './components/Shop/Shop.jsx';
import Contact from './components/Contact/Contact.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import CheckoutPage from './components/CheckoutPage/CheckoutPage.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import FloatingWhatsapp from './components/FloatingWhatsapp/FloatingWhatsapp.jsx';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <ProductProvider>
            <Navbar />
            <FloatingWhatsapp />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/login' element={< Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/admin-panel' element={<AdminPanel />} />
            </Routes>
            <Footer />
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
