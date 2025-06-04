// mfnews-frontend/src/api/newsService.ts
import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'; 

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`, 
});

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            // *** CAMBIO CLAVE AQUÍ: Ahora llama a '/all' ***
            const response = await api.get<News[]>('/all'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            // Esto seguirá siendo /api/:id
            const response = await api.get<News>(`/${id}`); // <--- MANTÉN ESTO ASI
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },
    
    // ... (el resto de las funciones se mantienen como están,
    // ya que sus rutas no colisionan con el nuevo /all)
    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            const response = await api.post<News>('/', newsData); // será /api/
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            const response = await api.put<News>(`/${id}`, newsData); // será /api/:id
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            const response = await api.delete<{ message: string; id: number }>(`/${id}`); // será /api/:id
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            const response = await api.get<News[]>('/search', { params }); // será /api/search
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;