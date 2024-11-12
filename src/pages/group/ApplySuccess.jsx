import React from "react";
import styles from "./ApplySuccess.module.css";


const ApplySuccess = () => {

    const handleSubmit = () => {
        console.log("submit");
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
