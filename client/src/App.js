import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';

function App() {
  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home ></Home>} ></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
