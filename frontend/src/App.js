import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Header/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import AllTours from "./Pages/AllTour/AllTours";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
import Footer from "./Components/Footer/Footer";
import SingleTour from "./Pages/SingleTour/SingleTour";
import store from "./Redux/store";
import { loadUser } from "./Redux/User/userAction";
import Dashboard from "./Admin/Dashboard/Dashboard";
import UserProfile from "./Pages/UserProfile/UserProfile";
import CheckoutSucess from "./Components/CheckoutSuccess/CheckoutSucess";
import User from "./Admin/ManageUser/User";
import { useSelector } from "react-redux";
import ManageTour from "./Admin/ManageTour/ManageTour";
import AddTour from "./Admin/ManageTour/AddTour";
import ManageBooking from "./Admin/ManageBooking/ManageBooking";
import ManageReview from "./Admin/ManageReview/ManageReview";

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
        <Route path="/alltour" element={<AllTours />} />
        <Route path="/tour/:id" element={<SingleTour />} />

        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />

        <Route
          path="/signup"
          element={isAuthenticated ? <Home /> : <Register />}
        />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/:id/:token" element={<ResetPassword />} />
        <Route path="/success" element={<CheckoutSucess />} />
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
        <Route
          exact
          path="/admin/booking"
          element={role === "admin" ? <ManageBooking /> : <Home />}
        />
        <Route
          exact
          path="/admin/review"
          element={role === "admin" ? <ManageReview /> : <Home />}
        />

        <Route path="*" element={<div>page notfound </div>} />
      </Routes>
      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
