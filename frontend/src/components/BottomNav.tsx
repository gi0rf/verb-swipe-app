// frontend/src/components/BottomNav.tsx
import { User, Layers, PenTool } from 'lucide-react';
import './BottomNav.css'; // Importamos los estilos

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const tabs = [
    { id: 'profile', icon: <User size={24} />, label: 'Perfil' },
    { id: 'swipe', icon: <Layers size={24} />, label: 'Swipe' },
    { id: 'writing', icon: <PenTool size={24} />, label: 'Escritura' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`nav-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
        >
          {tab.icon}
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};