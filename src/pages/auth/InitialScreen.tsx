// InitialScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './InitialScreen.css';
import MainLogo from './Main-Logo3.jpg';

const InitialScreen: React.FC = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="initial-screen">
      <div className="text-overlay">
        <h1>Book & TALK</h1>
        <h3>-- BOOK CLUB --</h3>
      </div>
      <img src={MainLogo} className="main-logo" alt="Main Logo" />
      <div className="button-overlay">
        <button onClick={handleKakaoLogin} className="kakao-button">
          카카오톡으로 로그인
        </button>
        <Link to="/login">
          <button className="login-button">이메일로 로그인</button>
        </Link>
      </div>
    </div>
  );
};

export default InitialScreen;
