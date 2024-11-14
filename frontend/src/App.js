import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
