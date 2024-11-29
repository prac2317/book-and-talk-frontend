// Register.tsx
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 구현
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
      <Link to="/login" style={{ color: '#cbd7d7', fontSize: '13px' }}>
        로그인으로 돌아가기
      </Link>
    </div>
  );
};

export default Register;
