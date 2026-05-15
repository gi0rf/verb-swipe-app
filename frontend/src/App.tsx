// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import { VerbCard } from './components/VerbCard';
import { BottomNav } from './components/BottomNav';
import type { VerbData } from './types/types';
import './App.css'; 

function App() {
  // 1. Estados (Variables que TypeScript no encontraba)
  const [verbs, setVerbs] = useState<VerbData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('swipe');

  // 2. Efecto de carga inicial
  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/verbs/daily');
        const data = await response.json();
        setVerbs(data);
      } catch (error) {
        console.error("Error al cargar verbos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDaily();
  }, []);

  // 3. Lógica para manejar el deslizamiento
  const handleSwipe = async (direction: 'right' | 'left', verbId: number) => {
    const isMastered = direction === 'right';
    try {
      await fetch(`http://127.0.0.1:8000/api/verbs/${verbId}/swipe?mastered=${isMastered}`, {
        method: 'POST'
      });
    } catch (err) {
      console.error("Error al guardar progreso:", err);
    }
    setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
  };

  // 4. Lógica de renderizado por pestañas
  const renderContent = () => {
    if (loading) return <p className="tab-section">Cargando sesión...</p>;

    switch (activeTab) {
      case 'profile':
        return (
          <div className="tab-section">
            <h2>Tu Perfil</h2>
            <p>Aquí pondremos tus estadísticas y racha de estudio.</p>
          </div>
        );
      case 'writing':
        return (
          <div className="tab-section">
            <h2>Modo Escritura</h2>
            <p>Próximamente: Escribe el gerundio correcto.</p>
          </div>
        );
      case 'swipe':
      default:
        return (
          <div className="swipe-container">
            {currentIndex < verbs.length ? (
              <VerbCard 
                key={verbs[currentIndex].id}
                baseForm={verbs[currentIndex].base_form}
                spanish={verbs[currentIndex].spanish}
                gerund={verbs[currentIndex].gerund}
                example={verbs[currentIndex].example}
                onSwipeRight={() => handleSwipe('right', verbs[currentIndex].id)}
                onSwipeLeft={() => handleSwipe('left', verbs[currentIndex].id)}
              />
            ) : (
              // Le quitamos los fondos negros y usamos tus clases CSS
              <div className="finished-card" style={{ background: 'var(--honeydew)' }}>
                <h2 style={{color: 'var(--text-dark)'}}>¡Todo listo! 🚀</h2>
                <p style={{color: '#4a5568'}}>Has repasado todos tus verbos pendientes de hoy.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-reload"
                  style={{ background: 'var(--cherry-blossom)', color: 'var(--text-dark)' }}
                >
                  Actualizar sesión
                </button>
              </div>
            )}
            
          </div>
        );
    }
  };

  // 5. Estructura principal de la App
  return (
    <div className="app-container">
      <header className="header">
        <h1>Verb Swipe 🧠</h1>
      </header>

      <main className="tab-content">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;