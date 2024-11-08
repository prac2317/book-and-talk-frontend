import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Map' },
  { to: '/like', label: 'Like' },
  { to: '/chat', label: 'Chat' },
  { to: '/profile', label: 'Profile' },
];

const Navigation = () => {
  return (
    <div className={styles.nav}>
      {navigations.map((nav) => (
        <NavLink key={nav.to} to={nav.to} end>
          {nav.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
