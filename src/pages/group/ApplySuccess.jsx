import React from "react";
import styles from "./ApplySuccess.module.css";
import {useLocation, useNavigate} from "react-router-dom";


const ApplySuccess = () => {
    const location = useLocation();
    const { groupId } = location.state || {};
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/groups/${groupId}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerBox}>
                <span className={styles.closeBtn}>&times;</span>

                <div className={styles.successBox}>
                    가입 신청이 완료되었습니다.
                </div>
            </div>
            <img className={styles.badger} src="../../../public/icon/Logo-badger-2.webp" alt="badger"/>
            <button className={styles.button} onClick={handleSubmit}>
                완료
            </button>
        </div>

    )
}

export default ApplySuccess;
