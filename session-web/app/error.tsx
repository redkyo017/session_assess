'use client';
import './globals.css'
import { useEffect } from 'react';
import styles from './layout.module.css';

export default function Error({
  error,
  reset,
}: {error: any, reset: any}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <div>ERROR</div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}