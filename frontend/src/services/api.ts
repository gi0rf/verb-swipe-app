import type { VerbData } from '../types/types.ts';

const API_URL = 'http://127.0.0.1:8000/api';

export const getVerbs = async (): Promise<VerbData[]> => {
  try {
    const response = await fetch(`${API_URL}/verbs/`);
    if (!response.ok) {
      throw new Error('Error al conectar con FastAPI');
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getVerbs:", error);
    return [];
  }
};