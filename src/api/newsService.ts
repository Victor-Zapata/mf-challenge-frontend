// mfnews-frontend/src/api/newsService.ts
import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'; 

const api = axios.create({
    baseURL: API_BASE_URL, 
});

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            // *** CAMBIO CLAVE AQUÍ: api.get<News[]> en lugar de api.get<News> ***
            const response = await api.get<News[]>('/news'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            // Aquí está bien <News> porque esperas una sola noticia
            const response = await api.get<News>(`/news/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },

    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            // Aquí también está bien <News>
            const response = await api.post<News>('/news', newsData); 
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            // Aquí también está bien <News>
            const response = await api.put<News>(`/news/${id}`, newsData); 
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            // Aquí el tipo de retorno específico está bien
            const response = await api.delete<{ message: string; id: number }>(`/news/${id}`); 
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            // *** CAMBIO CLAVE AQUÍ: api.get<News[]> en lugar de api.get<News> ***
            // Porque la búsqueda también devolverá un array de noticias
            const response = await api.get<News[]>('/news/search', { params }); 
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;