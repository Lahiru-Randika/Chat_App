import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Signup from "./pages/signup/signup.jsx";
import { Toaster } from "react-hot-toast";
import { userAuthContext } from './context/authContext.jsx';
import { createContext, useState } from 'react';

export const MyContext = createContext();

function App() {

  const { authUser } = userAuthContext();

  const [currentRequestedChatName, setCurrentRequestedChatName] = useState("");
  const [currentRequestedPropic, setCurrentRequestedPropic] = useState();
  const [clickedMeToSeeMyChat,setClickedMeToSeeMyChat] = useState();
  const [searchedUser, setSearchedUser] = useState("");

  const values={
    currentRequestedChatName, 
    setCurrentRequestedChatName,
    clickedMeToSeeMyChat,
    setClickedMeToSeeMyChat,
    searchedUser, 
    setSearchedUser,
    currentRequestedPropic, 
    setCurrentRequestedPropic
};

  return (
    <Router>
      <div className='p-1 d-flex align-items-center justify-content-center'>
      <MyContext.Provider value={values}>
        <Routes>
          <Route path="/" element={
            authUser? <Home /> : <Navigate to="/login"/>
          }/>
          <Route path="/login" element={
            authUser? <Navigate to="/"/> : <Login />
          }/>
          <Route path="/signup" element={
            authUser? <Navigate to="/login" /> : <Signup />
          }/>
        </Routes>

        {/* this is used to show the errors in the frontend (like all data should be filled in the form) */}
        <Toaster />
        </MyContext.Provider>
      </div>
    </Router>
  );
}

export default App;
