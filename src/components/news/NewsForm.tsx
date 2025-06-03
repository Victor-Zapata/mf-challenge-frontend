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
        content: '',
        image_url: '',
        author: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (newsToEdit) {
            console.log('--- useEffect: newsToEdit recibido ---');
            console.log('newsToEdit:', newsToEdit);
            setFormData({
                title: newsToEdit.title,
                content: newsToEdit.content,
                image_url: newsToEdit.image_url || '',
                author: newsToEdit.author || '',
            });
            console.log('formData después de setear (en useEffect):', {
                title: newsToEdit.title,
                content: newsToEdit.content,
                image_url: newsToEdit.image_url || '',
                author: newsToEdit.author || '',
            }); // Loggea el objeto directo para evitar closures
        } else {
            console.log('--- useEffect: Modo Creación ---');
            setFormData({
                title: '',
                content: '',
                image_url: '',
                author: '',
            });
        }
        setError(null);
    }, [newsToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log('--- handleChange ---');
        console.log(`Campo: ${name}, Nuevo valor: ${value}`);
        setFormData(prev => ({ ...prev, [name]: value }));
        // Nota: Si quieres ver el estado actualizado aquí, necesitarías otro useEffect o pasar un callback a setFormData
        // console.log('formData actual (en handleChange):', { ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log('--- handleSubmit: formData actual antes de validación ---');
        console.log('formData:', formData); // Verifica el estado final antes de enviar

        if (!formData.title || !formData.content) {
            setError('Título y Contenido son campos obligatorios.');
            setLoading(false);
            console.log('Validación Frontend FALLIDA: Título o Contenido vacíos.');
            return;
        }

        try {
            const dataToSend: NewNewsData | UpdateNewsData = {
                title: formData.title,
                content: formData.content,
                author: formData.author,
                image_url: formData.image_url,
            };
            console.log('--- handleSubmit: dataToSend preparado ---');
            console.log('dataToSend:', dataToSend);

            if (newsToEdit) {
                console.log('Modo Edición: newsToEdit.id:', newsToEdit.id);
                await newsService.updateNews(newsToEdit.id, dataToSend as UpdateNewsData);
                console.log('Noticia ACTUALIZADA en el backend.');
            } else {
                console.log('Modo Creación: Enviando dataToSend.');
                await newsService.createNews(dataToSend as NewNewsData);
                console.log('Noticia CREADA en el backend.');
            }
            onSave();
        } catch (err) {
            console.error('Error saving news (frontend):', err);
            const errorMessage = (err as any)?.response?.data?.message || (err as Error).message || 'Por favor, intente de nuevo.';
            setError(`Error al guardar la noticia: ${errorMessage}`);
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
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUrl">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Contenido de la Noticia</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={formData.content}
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