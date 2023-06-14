import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Header/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AllTours from './Pages/AllTour/AllTours';
import Register from './Pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ForgotPassword/ResetPassword';
import Footer from './Components/Footer/Footer';
import SingleTour from './Pages/SingleTour/SingleTour';
import About from './Pages/About/About';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alltour" element={<AllTours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/:id/:token" element={<ResetPassword />} />
        <Route path="/tour/:id" element={<SingleTour />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;