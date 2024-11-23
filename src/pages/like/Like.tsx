import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./Like.css"; // CSS 파일 임포트

const Like: React.FC = () => {
    const nav = useNavigate();
    const location = useLocation();

    // 현재 경로가 /like 또는 /like/ 일 때 기본 페이지로 리다이렉트
    React.useEffect(() => {
        if (location.pathname === "/like" || location.pathname === "/like/") {
            nav("bookmark-page", { replace: true });
        }
    }, [location.pathname, nav]);

    return (
        <div className="app-wrapper">
            <div className="mark-container">
                <div className="top-nav">
                    <h3 className="title">즐겨찾기</h3>
                    <div className="top-buttons">
                        <button
                            onClick={() => nav("bookmark-page")}
                            className={location.pathname.endsWith("/bookmark-page") ? "bold" : ""}
                            aria-label="책 페이지로 이동"
                        >
                            책
                        </button>
                        <button
                            onClick={() => nav("groupmark-page")}
                            className={location.pathname.endsWith("/groupmark-page") ? "bold" : ""}
                            aria-label="모임 페이지로 이동"
                        >
                            모임
                        </button>
                    </div>
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Like;
