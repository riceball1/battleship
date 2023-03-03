import React, { useState } from 'react';
import styles from '@/styles/Accordion.module.css';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ children, title }: Props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={styles.Accordion}>
      <button
        className={styles.AccordionTitle}
        onClick={() => setToggle((prevState) => !prevState)}
      >
        <h2>{title}</h2>{' '}
        <span
          className={`${styles.AccordionIcon} ${toggle ? styles.active : ''}`}
        />
      </button>
      <div
        className={`${styles.AccordionBody} ${toggle ? styles.bodyActive : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
