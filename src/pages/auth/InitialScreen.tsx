// InitialScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './InitialScreen.css';

const InitialScreen: React.FC = () => {
    const handleKakaoLogin = () => {
        const kakaoAuthUrl = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`;
        window.location.href = kakaoAuthUrl;
    };

    return (
        <div className="initial-screen">
            <h1>앱 로고</h1>
            <button onClick={handleKakaoLogin} className="kakao-button">카카오 로그인</button>
            <Link to="/login">
                <button className="login-button">일반 로그인</button>
            </Link>
        </div>
    );
};

export default InitialScreen;
