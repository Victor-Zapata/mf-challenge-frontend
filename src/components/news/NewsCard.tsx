// mfnews-frontend/src/components/news/NewsCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { News } from '../../types/news';

interface NewsCardProps {
    news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const formatDate = (isoString: string): string => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Card className="h-100 news-card shadow-sm border-0 transition-shadow transition-transform duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg">
            <Link to={`/news/${news.id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
                <Card.Img variant="top" src={news.image_url} alt={news.title} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column flex-grow-1">
                    <Card.Title className="mb-2 fs-5 fw-bold text-dark">{news.title}</Card.Title>
                    <Card.Text className="text-muted small mb-1">Por: {news.author}</Card.Text>
                    <Card.Text className="text-muted small mt-auto text-end">
                        Publicado el: {formatDate(news.date)}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default NewsCard;