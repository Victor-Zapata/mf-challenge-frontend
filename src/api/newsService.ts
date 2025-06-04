import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

// Creo una instancia de Axios para configurar la baseURL una sola vez
const api = axios.create({
    baseURL: API_BASE_URL, // Añade /api aquí para que todas las rutas lo usen
});

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            const response = await api.get<News[]>(`${API_BASE_URL}/news`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            const response = await api.get<News>(`${API_BASE_URL}/news/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },

    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            const response = await api.post<News>(`${API_BASE_URL}/news`, newsData);
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            const response = await api.put<News>(`${API_BASE_URL}/news/${id}`, newsData);
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            const response = await api.delete<{ message: string; id: number }>(`${API_BASE_URL}/news/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            const response = await api.get<News[]>(`${API_BASE_URL}/news/search`, { params });
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;