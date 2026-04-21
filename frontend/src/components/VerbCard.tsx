// frontend/src/components/VerbCard.tsx
import { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import styles from './VerbCard.module.css';

interface VerbCardProps {
  baseForm: string;
  spanish: string;
  gerund: string;
  example: string;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

export function VerbCard({ baseForm, spanish, gerund, example, onSwipeRight, onSwipeLeft }: VerbCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [leaveX, setLeaveX] = useState(0);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      setLeaveX(1000);
      if (onSwipeRight) onSwipeRight();
    } else if (info.offset.x < -swipeThreshold) {
      setLeaveX(-1000);
      if (onSwipeLeft) onSwipeLeft();
    }
  };

  return (
    <motion.div 
      className={styles.card} 
      onClick={() => setIsFlipped(!isFlipped)}
      drag="x" 
      dragConstraints={{ left: 0, right: 0 }} 
      onDragEnd={handleDragEnd} 
      animate={{ x: leaveX }} 
      transition={{ type: "spring", stiffness: 300, damping: 20 }} 
      style={{ touchAction: 'none' }} 
    >
      {!isFlipped ? (
        <div className={styles.front}>
          <h2>{spanish}</h2>
          <p>Toca para revelar</p>
        </div>
      ) : (
        <div className={styles.back}>
          <h2>{baseForm}</h2>
          <p>Gerundio: <strong>{gerund}</strong></p>
          <hr />
          <p>"{example}"</p>
        </div>
      )}
    </motion.div>
  );
}