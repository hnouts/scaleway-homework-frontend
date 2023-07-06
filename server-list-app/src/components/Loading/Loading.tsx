import React from 'react';
import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return(
    <div className={styles.container} data-testid="loading">
      <p>Loading...</p>
    </div>
)};

export default Loading;
