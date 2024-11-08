import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navigation from './components/Navigation';
import styles from './index.module.css';

const AppLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.view}>
        <Outlet />
      </div>
      <Navigation />
      <ScrollRestoration />
    </div>
  );
};

export default AppLayout;
