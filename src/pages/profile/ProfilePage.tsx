import ky from 'ky';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 로그아웃을 위한 GET 요청
      const response = await ky.get('http://localhost:8080/logout', {
        credentials: 'include', // 쿠키 포함
        throwHttpErrors: false, // 2xx가 아닌 응답에서도 에러를 던지지 않음
      });

      if (response.status === 200) {
        // const data = await response.json();
        console.log('로그아웃 성공:');
        localStorage.removeItem('access_token');
        navigate('/login');
      } else {
        console.error(`로그아웃 중 예상치 못한 응답 상태: ${response.status}`);
      }
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  return (
    <>
      <h3>Profile</h3>
      <button onClick={logout}>로그아웃</button>
    </>
  );
};

export default ProfilePage;
