import React from 'react';
import styles from './DotFlashing.module.css';

export const DotFlashing = () => {
  return (
    <div className="snippet" data-title=".dot-flashing">
      <div className="stage">
        <div className={styles.dotFlashing}></div>
      </div>
    </div>
  );
};
