// frontend/src/components/VerbCard.tsx
import './VerbCard.module.css';

interface VerbCardProps {
  baseForm: string;
  spanish: string;
  gerund: string;
  example: string;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

export const VerbCard = ({ baseForm, spanish, gerund, example }: VerbCardProps) => {
  return (
    <div className="verb-card">
      <div className="verb-content">
        <div className="verb-base">{baseForm}</div>
        <div className="verb-spanish">{spanish}</div>
        
        <div className="verb-gerund">
          {gerund}
        </div>
        
        <div className="verb-example">
          "{example}"
        </div>
      </div>
    </div>
  );
};