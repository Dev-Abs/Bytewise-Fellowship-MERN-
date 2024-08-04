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
import Footer from "./components/Footer";

function App() {
  const [alert,setAlert] = useState(false)
  const [message,setMessage] = useState("")

  const toggleSuccess = (msg) => {
    setMessage(msg);
    setAlert(!alert)
    closeAlert()
  }

  const closeAlert = () => {
    setTimeout(() => {
      setAlert(false)
    }, 10000)
  }

  return (
    // <>
    // <UserProfile />
    // <Signup />
    // <Login />
    // </>

    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
        <div className="flex-grow">
      {alert && <SuccessAlert message={message } />}
    <Routes>
    <Route path="/signup" element={<Signup toggleSuccess={toggleSuccess}/>} />
    <Route path="/" element={<BlogList />} />
    <Route path="/myblogs" element={<MyBlogs toggleSuccess={toggleSuccess} />} />
    <Route path="/createblog" element={<CreateBlog toggleSuccess={toggleSuccess} />} />
    <Route path="/signin" element={<Login toggleSuccess={toggleSuccess} />} />
    </Routes>
    </div>
    <Footer />
    </div>
  </Router>
  )
}

export default App
