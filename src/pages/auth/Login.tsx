import ky from 'ky';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

// 로그인 성공 시 응답 데이터의 타입 정의 (필요에 따라 수정)
interface LoginResponse {
    // 예시 필드
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

// 세션 확인 응답 데이터의 타입 정의 (필요에 따라 수정)
interface CheckSessionResponse {
    // 예시 필드
    authenticated: boolean;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                // 세션 확인을 위한 GET 요청
                const response = await ky.get<CheckSessionResponse>('http://localhost:8080/api/member/check-session', {
                    credentials: 'include', // 쿠키 포함
                    throwHttpErrors: false,  // 2xx가 아닌 응답에서도 에러를 던지지 않음
                });

                if (response.status === 200) {
                    const data: CheckSessionResponse = await response.json();
                    setIsAuthenticated(data.authenticated);
                } else if (response.status === 401) {
                    setIsAuthenticated(false);
                } else {
                    console.error(`예상치 못한 응답 상태: ${response.status}`);
                }
            } catch (error) {
                console.error('세션 확인 중 오류:', error);
                setIsAuthenticated(false);
            }
        };

        checkSession();
    }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때 한 번만 실행

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loginUser();
    };

    const loginUser = async () => {
        setIsLoading(true);
        setError('');
        try {
            console.log('이메일:', email);
            console.log('비밀번호:', password);

            // 로그인 요청을 위한 POST 요청
            const response = await ky.post<LoginResponse>('http://localhost:8080/api/member/login', {
                credentials: 'include', // 쿠키 포함
                json: { email, password }, // JSON 페이로드 전송
                throwHttpErrors: false,   // 2xx가 아닌 응답에서도 에러를 던지지 않음
            });

            if (response.status === 200) {
                const data: LoginResponse = await response.json();
                console.log('로그인 성공:', data);
                setIsAuthenticated(true);
            } else if (response.status === 401) {
                console.error('잘못된 자격 증명');
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                console.error(`예상치 못한 응답 상태: ${response.status}`);
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류:', error);
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKakaoLogin = () => {
        console.log('카카오 OAuth로 리디렉션');
        const kakaoAuthUrl = 'http://localhost:8080/oauth2/authorization/kakao';
        window.location.href = kakaoAuthUrl;
    };

    const logout = async () => {
        try {
            // 로그아웃을 위한 GET 요청
            const response = await ky.get('http://localhost:8080/api/member/logout', {
                credentials: 'include', // 쿠키 포함
                throwHttpErrors: false,  // 2xx가 아닌 응답에서도 에러를 던지지 않음
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('로그아웃 성공:', data);
                setIsAuthenticated(false);
            } else {
                console.error(`로그아웃 중 예상치 못한 응답 상태: ${response.status}`);
            }
        } catch (error) {
            console.error('로그아웃 중 오류:', error);
        }
    };

    return (
        <div className="login-container">
            {isAuthenticated ? (
                <div>
                    <p>로그인 되었습니다</p>
                    <button onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <>
                    <h2>로그인</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">이메일:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">비밀번호:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? '로그인 중...' : '로그인'}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                    <p>
                        <Link to="/register">회원가입</Link>
                    </p>
                </>
            )}
            <img
                src="/kakao_login_medium_narrow.png" // public 폴더의 이미지 경로는 '/'로 시작
                alt="카카오 로그인"
                onClick={handleKakaoLogin}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default Login;
