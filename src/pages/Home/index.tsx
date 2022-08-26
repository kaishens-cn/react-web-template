import React from 'react';

import LogoIcon from '@/assets/logo.svg';

import styles from './index.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <LogoIcon className={styles.logo} />
        <p>
          Edit <code>src/pages/Home/index.tsx</code> and save to reload.
        </p>
        <a className={styles.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          components
        </a>
      </header>
    </div>
  );
};

export default Home;
