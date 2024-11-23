import Logout from './Logout';
import styles from './profile.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.header34}>
      <h3 className={styles.header}>마이페이지</h3>
      <Logout />

      <div className={styles.name12}>오소리</div>
      <div className={styles.name23}>email.gmail.com</div>
      <div className={styles.textContainer}>
        <div className={styles.textBox}>
          <input
            className="text12"
            type="text"
            placeholder="가입한 모임
        4"
          />
        </div>
        <div className={styles.textBox}>
          <input
            className="text23"
            type="text"
            placeholder="제출한 결과물
        4"
          />
        </div>
      </div>
      <div className={styles.name123123}>
        <p className={styles.profileInfoHeader}>가입정보</p>

        <div className={styles.profileAction}>회원정보수정</div>
        <div className={styles.profileAction}>로그아웃</div>
        <div className={styles.profileActio33}>회원탈퇴</div>
        <p className={styles.profileInfoHeader}>고객센터</p>
        <div className={styles.profileAction}>공지사항</div>
        <div className={styles.profileAction}>서비스 이용 약관</div>
        <div className={styles.profileAction}>버전 정보</div>
      </div>
    </div>
  );
};

export default ProfilePage;
