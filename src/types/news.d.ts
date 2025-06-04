
export interface News {
    id: number;
    title: string;
    content: string;
    image_url: string;
    author: string;
    date: string; 
}

// Para la creación de noticias (sin ID ni fecha, porque los genera el backend)
export type NewNewsData = Omit<News, 'id' | 'date'>;

// Para la actualización de noticias (todos los campos son opcionales)
export type UpdateNewsData = Partial<NewNewsData>;

// Para los parámetros de búsqueda
export interface NewsSearchParams {
    query?: string;
    author?: string;
}