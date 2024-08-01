import { useState } from "react";
import Login from "./components/Login"
import Signup from "./components/SignUp"
import SuccessAlert from "./components/SuccessAlert";
import UserProfile from "./components/UserProfle"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";
import MyBlogs from "./components/MyBlogs";

function App() {
  const [alert,setAlert] = useState(false)

  const toggleSuccess = () => {
    setAlert(!alert)
  }

  const changeAlert = setTimeout(()=>{
    setAlert(false)
    }, 4000)
  return (
    // <>
    // <UserProfile />
    // <Signup />
    // <Login />
    // </>

    <Router>
      <Navbar />
      {alert && <SuccessAlert />}
    <Routes>
    <Route path="/signup" element={<Signup toggleSuccess={toggleSuccess}/>} />
    <Route path="/" element={<BlogList />} />
    <Route path="/myblogs" element={<MyBlogs />} />
    <Route path="/createblog" element={<CreateBlog />} />
    <Route path="/signin" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
