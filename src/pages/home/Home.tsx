import Recommendations from './Recommendations.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('access_token', token);

      query.delete('token');
      navigate(
        {
          pathname: location.pathname,
          search: query.toString(),
        },
        { replace: true },
      );
    }
  }, [location, navigate]);

  return (
    <>
      <Recommendations />
    </>
  );
};

export default Home;
