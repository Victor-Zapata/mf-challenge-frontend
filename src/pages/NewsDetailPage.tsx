import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newsService from '../api/newsService';
import Spinner from '../components/common/Spinner.tsx';
import { News } from '../types/news';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';

interface NewsDetailPageProps {
    handleEditNews: (news: News) => void;
    handleDeleteRequest: (id: number) => void;
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ handleEditNews, handleDeleteRequest }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            setLoading(true);
            setError(null);
            const newsId = Number(id);
            if (isNaN(newsId)) {
                setError('ID de noticia inválido. Por favor, verifique la URL.');
                setLoading(false);
                return;
            }

            try {
                const data = await newsService.getNewsById(newsId);
                setNews(data);
            } catch (err) {
                setError('Error al cargar el detalle de la noticia. Podría no existir o haber un problema de conexión.');
                console.error(`Error fetching news detail for ID ${id}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    const formatDate = (isoString: string): string => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center mx-auto my-5" style={{ maxWidth: '600px' }}>
                <Alert.Heading>¡Error!</Alert.Heading>
                <p>{error}</p>
                <hr />
                <Button variant="primary" onClick={() => navigate('/')}>
                    Volver al Listado
                </Button>
            </Alert>
        );
    }

    if (!news) {
        return (
            <Alert variant="warning" className="text-center mx-auto my-5" style={{ maxWidth: '600px' }}>
                <Alert.Heading>¡Atención!</Alert.Heading>
                <p>Noticia no encontrada.</p>
                <hr />
                <Button variant="primary" onClick={() => navigate('/')}>
                    Volver al Listado
                </Button>
            </Alert>
        );
    }

    return (
        <Container className="my-4">
            <Card className="shadow-lg p-4 border-0">
                <Button variant="link" onClick={() => navigate('/')} className="mb-4 text-decoration-none d-inline-flex align-items-center">
                    &larr; Volver al Listado
                </Button>

                <h1 className="display-4 fw-bold mb-3">{news.title}</h1>
                <p className="text-muted mb-4">
                    Por: <span className="fw-semibold">{news.author}</span> | Publicado el: {formatDate(news.date)}
                </p>

                <Card.Img variant="top" src={news.image_url} alt={news.title} className="mb-4 rounded shadow-sm" style={{ maxHeight: '450px', objectFit: 'cover' }} />

                <Card.Text className="lead mb-5">
                    {news.content}
                </Card.Text>

                <div className="d-flex justify-content-end gap-3 border-top pt-4">
                    <Button variant="primary" onClick={() => handleEditNews(news)} className="d-inline-flex align-items-center">
                        <PencilFill className="me-2" /> Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteRequest(news.id)} className="d-inline-flex align-items-center">
                        <TrashFill className="me-2" /> Eliminar
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default NewsDetailPage;