import axios from 'axios';
import { News, NewNewsData, UpdateNewsData, NewsSearchParams } from '../types/news';

const API_BASE_URL = 'http://localhost:3000/api'; 

const newsService = {
    getAllNews: async (): Promise<News[]> => {
        try {
            const response = await axios.get<News[]>(`${API_BASE_URL}/news`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all news:', error);
            throw error;
        }
    },

    getNewsById: async (id: number): Promise<News> => {
        try {
            const response = await axios.get<News>(`${API_BASE_URL}/news/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with ID ${id}:`, error);
            throw error;
        }
    },

    createNews: async (newsData: NewNewsData): Promise<News> => {
        try {
            const response = await axios.post<News>(`${API_BASE_URL}/news`, newsData);
            return response.data;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    },

    updateNews: async (id: number, newsData: UpdateNewsData): Promise<News> => {
        try {
            const response = await axios.put<News>(`${API_BASE_URL}/news/${id}`, newsData);
            return response.data;
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id: number): Promise<{ message: string; id: number }> => {
        try {
            const response = await axios.delete<{ message: string; id: number }>(`${API_BASE_URL}/news/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting news with ID ${id}:`, error);
            throw error;
        }
    },

    searchNews: async (params: NewsSearchParams): Promise<News[]> => {
        try {
            const response = await axios.get<News[]>(`${API_BASE_URL}/news/search`, { params });
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
};

export default newsService;