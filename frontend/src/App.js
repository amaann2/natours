import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Header/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import AllTours from "./Pages/AllTour/AllTours";
import Register from "./Pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
import Footer from "./Components/Footer/Footer";
import SingleTour from "./Pages/SingleTour/SingleTour";
import About from "./Pages/About/About";
import { useEffect } from "react";
import store from "./Redux/store";
import { loadUser } from "./Redux/User/userAction";
import axios from "axios";
import Dashboard from './Admin/Dashboard'
import AdminRoute from "./Utils/AdminRoute";
import UserRoute from "./Utils/UserRoute";
import Layout from "./Utils/Layout";
import ProtectedRoute from "./Utils/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    store.dispatch(loadUser());

  }, []);
  return (
    <>
      <Navbar />
      <Routes>

        {/* User route */}

        <Route path="/" element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alltour" element={<AllTours />} />
          <Route path="/tour/:id" element={<SingleTour />} />



          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/:id/:token" element={<ResetPassword />} />


          {/* admin route */}
          {/* <Route path="/admin" element={
            <ProtectedRoute roles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          } /> */}



          {/* unhandled Route */}
          <Route path="*" element={<div>page notfound </div>} />

        </Route>

      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
