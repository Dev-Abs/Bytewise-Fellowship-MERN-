import Login from "./components/Login"
import Signup from "./components/SignUp"
import UserProfile from "./components/UserProfle"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    // <>
    // <UserProfile />
    // <Signup />
    // <Login />
    // </>

    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
