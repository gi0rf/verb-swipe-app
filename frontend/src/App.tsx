// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import { VerbCard } from './components/VerbCard.tsx';
import { getVerbs } from './services/api.ts';
import type { VerbData } from './types/types.ts';

function App() {
  const [verbs, setVerbs] = useState<VerbData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDatos = async () => {
      const data = await getVerbs();
      setVerbs(data);
      setLoading(false);
    };
    fetchDatos();
  }, []);

  const handleSwipe = (direction: 'right' | 'left', verbId: number) => {
    console.log(`Verbo ${verbId} deslizado a la ${direction}`);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  if (loading) return <p style={{textAlign: 'center'}}>Cargando...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4F46E5' }}>Verb Swipe 🧠</h1>
      
      {verbs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Base de datos vacía. Agrega verbos en FastAPI.</p>
      ) : currentIndex < verbs.length ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VerbCard 
            key={verbs[currentIndex].id}
            baseForm={verbs[currentIndex].base_form}
            spanish={verbs[currentIndex].spanish}
            gerund={verbs[currentIndex].gerund}
            example={verbs[currentIndex].example}
            onSwipeRight={() => handleSwipe('right', verbs[currentIndex].id)}
            onSwipeLeft={() => handleSwipe('left', verbs[currentIndex].id)}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>¡Repaso completado! 🎉</h2>
          <button onClick={() => setCurrentIndex(0)}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}

export default App;