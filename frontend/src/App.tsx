import { useState, useEffect } from 'react';
import { VerbCard } from './components/VerbCard.tsx';
import type { VerbData } from './types/types.ts';

function App() {
  const [verbs, setVerbs] = useState<VerbData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDaily = async () => {
      // Cambiamos a la nueva ruta que nos da solo los verbos del día
      const response = await fetch('http://127.0.0.1:8000/api/verbs/daily');
      const data = await response.json();
      setVerbs(data);
      setLoading(false);
    };
    fetchDaily();
  }, []);

  const handleSwipe = async (direction: 'right' | 'left', verbId: number) => {
    const isMastered = direction === 'right';

    // 1. Notificar al Backend (Fuego y olvido o esperar respuesta)
    try {
      await fetch(`http://127.0.0.1:8000/api/verbs/${verbId}/swipe?mastered=${isMastered}`, {
        method: 'POST'
      });
      console.log(`Backend actualizado: Verbo ${verbId} - Mastered: ${isMastered}`);
    } catch (err) {
      console.error("Error al guardar progreso:", err);
    }

    // 2. Animación y cambio de tarjeta
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  if (loading) return <p style={{textAlign: 'center'}}>Cargando tu sesión de hoy...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4F46E5' }}>Verb Swipe 🧠</h1>
      
      {currentIndex < verbs.length ? (
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
        <div style={{ textAlign: 'center', background: '#f3f4f6', padding: '2rem', borderRadius: '12px' }}>
          <h2>¡Todo listo por hoy! 🚀</h2>
          <p>Has repasado todos tus verbos pendientes.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            ¿Repasar de nuevo?
          </button>
        </div>
      )}
    </div>
  );
}

export default App;