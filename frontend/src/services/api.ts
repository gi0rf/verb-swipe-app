// frontend/src/services/api.ts
import type { VerbData } from '../types/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const getVerbs = async (): Promise<VerbData[]> => {
  try {
    const response = await fetch(`${API_URL}/verbs/`);
    if (!response.ok) throw new Error('Error al obtener los verbos');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    return []; // Devolvemos un arreglo vacío si el backend está apagado
  }
};