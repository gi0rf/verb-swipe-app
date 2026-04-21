// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import { VerbCard } from './components/VerbCard'; // Asegúrate de tener este componente
import { getVerbs } from './services/api';
import type { VerbData } from './types/types';

function App() {
  const [verbs, setVerbs] = useState<VerbData[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una sola vez al cargar la pantalla
  useEffect(() => {
    const fetchDatos = async () => {
      const data = await getVerbs();
      setVerbs(data);
      setLoading(false);
    };

    fetchDatos();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4F46E5' }}>Verb Swipe 🧠</h1>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando base de datos...</p>
      ) : verbs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay verbos todavía. ¡Agrega uno desde el panel de FastAPI!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
          {/* Mapeamos los verbos reales que vienen de tu base de datos SQLite */}
          {verbs.map((verb) => (
            <VerbCard 
              key={verb.id}
              baseForm={verb.base_form} // Fíjate cómo Python usa guión bajo y TypeScript lo lee tal cual
              spanish={verb.spanish}
              gerund={verb.gerund}
              example={verb.example}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;