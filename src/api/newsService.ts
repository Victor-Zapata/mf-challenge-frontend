// mfnews-frontend/src/api/newsService.ts
import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

// Esto usará http://localhost:3000 de tu .env o el fallback
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'; 

// La base de las URLs de Axios será http://localhost:3000/api
const api = axios.create({
    baseURL: `${API_BASE_URL}/api`, 
});

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            // Llama a http://localhost:3000/api/
            const response = await api.get<News[]>('/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            // Llama a http://localhost:3000/api/:id
            const response = await api.get<News>(`/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },

    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            // Llama a http://localhost:3000/api/
            const response = await api.post<News>('/', newsData);
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            // Llama a http://localhost:3000/api/:id
            const response = await api.put<News>(`/${id}`, newsData);
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            // Llama a http://localhost:3000/api/:id
            const response = await api.delete<{ message: string; id: number }>(`/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            // Llama a http://localhost:3000/api/search
            const response = await api.get<News[]>('/search', { params }); 
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;