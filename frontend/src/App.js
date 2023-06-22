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
import Dashboard from "./Admin/Dashboard";
import UserProfile from "./Pages/UserProfile/UserProfile";
import CheckoutSucess from "./Components/CheckoutSuccess/CheckoutSucess";
import User from "./Admin/User";

import { useSelector } from "react-redux";
import ManageTour from "./Admin/ManageTour/ManageTour";
import AddTour from "./Admin/ManageTour/AddTour";
axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated, role } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alltour" element={<AllTours />} />
        <Route path="/tour/:id" element={<SingleTour />} />

        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />

        <Route
          path="/signup"
          element={isAuthenticated ? <Home /> : <Register />}
        />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/:id/:token" element={<ResetPassword />} />
        <Route
          path="/success/:tourId/:userId/:price"
          element={<CheckoutSucess />}
        />
        <Route
          path="/user"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />

        <Route
          exact
          path="/admin"
          element={role === "admin" ? <Dashboard /> : <Home />}
        />
        <Route
          exact
          path="/admin/tour"
          element={role === "admin" ? <ManageTour /> : <Home />}
        />
        <Route
          exact
          path="/admin/user"
          element={role === "admin" ? <User /> : <Home />}
        />
        <Route
          exact
          path="/admin/tour/add"
          element={role === "admin" ? <AddTour /> : <Home />}
        />

        <Route path="*" element={<div>page notfound </div>} />
      </Routes>
      {role === "user" ? <Footer /> : ""}

      <ToastContainer />
    </>
  );
}

export default App;
