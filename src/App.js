import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Join from './join/Join'; // Join 페이지 임포트

function App() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/join');
  };

  return (
    <div className="container">
      <h1 className="title">Log-in</h1>
      <form className="loginForm">
        <label className="label">
          <span className="labelText">ID : &nbsp;</span> <input type="text" name="username" className="input" />
        </label>
        <br />
        <label className="label">
          <span className="labelText">PW : &nbsp;</span> <input type="password" name="password" className="input" />
        </label>
        <br />
        <div className="buttonGroup">
          <button type="button" className="submitBtn">로그인</button>
          <button type="button" className="joinBtn" onClick={handleJoinClick}>회원가입</button>
        </div>
      </form>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
