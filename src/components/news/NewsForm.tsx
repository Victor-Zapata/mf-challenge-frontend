// mfnews-frontend/src/components/news/NewsForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { News, NewNewsData, UpdateNewsData } from '../../types/news';
import newsService from '../../api/newsService';
import Spinner from '../common/Spinner.tsx';

interface NewsFormProps {
    newsToEdit: News | null;
    onSave: () => void;
    onClose: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsToEdit, onSave, onClose }) => {
    const [formData, setFormData] = useState<NewNewsData | UpdateNewsData>({
        title: '',
        body: '',
        image_url: '',
        author: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (newsToEdit) {
            setFormData({
                title: newsToEdit.title,
                body: newsToEdit.body,
                image_url: newsToEdit.image_url,
                author: newsToEdit.author,
            });
        } else {
            setFormData({
                title: '',
                body: '',
                image_url: '',
                author: '',
            });
        }
        setError(null);
    }, [newsToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.title || !formData.body || !formData.image_url || !formData.author) {
            setError('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        try {
            if (newsToEdit) {
                await newsService.updateNews(newsToEdit.id, formData as UpdateNewsData);
            } else {
                await newsService.createNews(formData as NewNewsData);
            }
            onSave();
        } catch (err) {
            console.error('Error saving news:', err);
            setError(`Error al guardar la noticia: ${(err as Error).message || 'Por favor, intente de nuevo.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {loading && <Spinner />}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUrl">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBody">
                <Form.Label>Cuerpo de la Noticia</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : (newsToEdit ? 'Actualizar Noticia' : 'Crear Noticia')}
                </Button>
            </div>
        </Form>
    );
};

export default NewsForm;