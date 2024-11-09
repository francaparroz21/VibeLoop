import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Shop from './components/Shop/Shop.jsx';
import Contact from './components/Contact/Contact.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/shop' element={<Shop />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;
