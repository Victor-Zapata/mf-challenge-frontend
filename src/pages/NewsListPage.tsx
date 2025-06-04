import React, { useEffect, useState, useCallback } from 'react';
import newsService from '../api/newsService';
import NewsCard from '../components/news/NewsCard.tsx';
import Spinner from '../components/common/Spinner.tsx';
import { News } from '../types/news';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

interface NewsListPageProps {
    refreshTrigger: number;
    handleEditNews: (news: News) => void;
    handleDeleteRequest: (id: number) => void;
}

const NewsListPage: React.FC<NewsListPageProps> = ({ refreshTrigger }) => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fetchNews = useCallback(async (query = '') => {
        setLoading(true);
        setError(null);
        try {
            let data: News[];
            if (query.trim()) {
                data = await newsService.searchNews({ query: query.trim() });
            } else {
                data = await newsService.getAllNews();
            }
            setNews(data);
        } catch (err) {
            setError('Error al cargar las noticias. Por favor, intente de nuevo más tarde.');
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews(searchTerm);
    }, [searchTerm, fetchNews, refreshTrigger]);

    return (
        <Container className="my-4">
            <Row className="justify-content-center mb-4">
                <Col xs={12} md={8} lg={6}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por título o autor..."
                        className="form-control-lg shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert variant="danger" className="text-center mx-auto my-4">
                    <Alert.Heading>¡Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            ) : news.length === 0 ? (
                <p className="text-center text-muted fs-5 py-5">No se encontraron noticias.</p>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {news.map((item) => (
                        <Col key={item.id}>
                            <NewsCard news={item} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default NewsListPage;