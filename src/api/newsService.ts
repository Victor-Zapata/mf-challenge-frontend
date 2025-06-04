// mfnews-frontend/src/api/newsService.ts
import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'; 

// *** ESTE ES EL AJUSTE CLAVE AHORA ***
// La baseURL de Axios debe ser la URL del backend + /api
// De esta forma, cuando hagas api.get('/news'), se convierta en /backend-url/api/news
const api = axios.create({
    baseURL: `${API_BASE_URL}/api`, 
});

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            // Esto ahora generará: https://mf-challenge-backend.onrender.com/api/news
            const response = await api.get<News[]>('/news'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            // Esto generará: https://mf-challenge-backend.onrender.com/api/news/:id
            const response = await api.get<News>(`/news/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },

    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            // Esto generará: https://mf-challenge-backend.onrender.com/api/news
            const response = await api.post<News>('/news', newsData);
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            // Esto generará: https://mf-challenge-backend.onrender.com/api/news/:id
            const response = await api.put<News>(`/news/${id}`, newsData);
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            // Esto generará: https://mf-challenge-backend.onrender.com/api/news/:id
            const response = await api.delete<{ message: string; id: number }>(`/news/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            // Esto generará: https://mf-challenge-backend.onrender.com/api/news/search
            const response = await api.get<News[]>('/news/search', { params }); 
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;