import './App.css'
import Home from './Home/Home'
import Loading from './components/Loading';
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider';
import { Navigate, Route, Routes } from "react-router-dom";
import  { Toaster } from  "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useAuth()
  // console.log(authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <Home />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
