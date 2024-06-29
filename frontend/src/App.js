
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import ForgotPassword from "./components/common/ForgotPassword";
import { createContext, useEffect, useState } from "react";
import UserHome from "./components/common/UserHome";
import About from "./components/common/About";
import PostBlog from './components/PostBlog';

export const UserContext = createContext({
  userData: null,
  userLoggedIn: false,
});

function App() {
  //const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
             
              {userLoggedIn ? (
                <>
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/postblog" element={<PostBlog />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
              <Route path="/postblog" element={<PostBlog />} />
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
           
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
