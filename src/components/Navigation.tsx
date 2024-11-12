import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

const navigations = [
  {
    to: '/',
    label: '홈',
    activeIcon: '/icon/Home-on.png',
    inactiveIcon: '/icon/Home-off.png',
  },
  {
    to: '/like',
    label: '즐겨찾기',
    activeIcon: '/icon/Star-on.png',
    inactiveIcon: '/icon/Star-off.png',
  },
  {
    to: '/chat',
    label: '채팅',
    activeIcon: '/icon/Chat-on.png',
    inactiveIcon: '/icon/Chat-off.png',
  },
  {
    to: '/profile',
    label: '마이페이지',
    activeIcon: '/icon/People-on.png',
    inactiveIcon: '/icon/People-off.png',
  },
];

const Navigation = () => {
  return (
      <div className={styles.nav}>
        {navigations.map((nav) => (
            <NavLink
                key={nav.to}
                to={nav.to}
                end
                className={({ isActive }) =>
                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                }
            >
              {({ isActive }) => (
                  <>
                    <img
                        src={isActive ? nav.activeIcon : nav.inactiveIcon}
                        alt={nav.label}
                        className={`${styles.navIcon} ${isActive ? 'active' : 'inactive'}`}
                    />
                    <span className={isActive ? styles.active : ''}>{nav.label}</span>
                  </>
              )}
            </NavLink>
        ))}
      </div>
  );
};

export default Navigation;
