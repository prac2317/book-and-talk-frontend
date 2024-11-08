import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';

const MapSearch = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 추가
  };

  return (
    <>
      <div className={styles.search}>
        <form onSubmit={handleSearch}>
          <button type="submit">검색</button>
          <input
            type="text"
            value={search}
            placeholder="지역을 입력하세요.."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.map} ref={mapContainerRef} />
    </>
  );
};

export default MapSearch;
