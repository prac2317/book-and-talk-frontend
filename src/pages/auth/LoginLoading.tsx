import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginLoading = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");

        if(token) {
            localStorage.setItem("access_token", token);

            query.delete('token');
            navigate({
                pathname: "/",
                search: query.toString(),
            }, { replace: true });
        }
    }, [location, navigate]);

    return(
        <div>
            로그인 중입니다...
        </div>
    )
}

export default LoginLoading;