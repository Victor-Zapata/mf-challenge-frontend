import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import NewsListPage from '../pages/NewsListPage.tsx';
import NewsDetailPage from '../pages/NewsDetailPage.tsx';
import Header from './news/Header.tsx';
import Modal from './common/Modal.tsx';
import NewsForm from './news/NewsForm.tsx';
import ConfirmationModal from './common/ConfirmationModal.tsx';
import NotificationToast from './common/NotificationToast.tsx';
import Footer from './common/Footer.tsx';

import { News } from '../types/news';
import newsService from '../api/newsService';
import ScrollToTopButton from './common/ScrollToTopButton.tsx';

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info';
}

function MainContent() {
    const navigate = useNavigate();
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [newsToDeleteId, setNewsToDeleteId] = useState<number | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
    };

    const handleNewNewsClick = () => {
        setEditingNews(null);
        setIsFormModalOpen(true);
    };

    const handleEditNews = (newsToEdit: News) => {
        setEditingNews(newsToEdit);
        setIsFormModalOpen(true);
    };

    const handleDeleteRequest = (id: number) => {
        setNewsToDeleteId(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (newsToDeleteId !== null) {
            try {
                await newsService.deleteNews(newsToDeleteId);
                showNotification(`Noticia eliminada exitosamente!`, 'success');
                setRefreshTrigger(prev => prev + 1);
                if (window.location.pathname.includes(`/news/${newsToDeleteId}`)) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error deleting news:', error);
                showNotification('Error al eliminar la noticia.', 'error');
            } finally {
                setIsConfirmModalOpen(false);
                setNewsToDeleteId(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setNewsToDeleteId(null);
    };

    const handleFormClose = () => {
        setIsFormModalOpen(false);
        setEditingNews(null);
    };

    const handleNewsSaved = () => {
        handleFormClose();
        showNotification(`Noticia ${editingNews ? 'actualizada' : 'creada'} exitosamente!`, 'success');
        setRefreshTrigger(prev => prev + 1);
        navigate('/');
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header onNewNewsClick={handleNewNewsClick} />
            <main className="container-fluid flex-grow-1" style={{ paddingTop: '80px' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <NewsListPage
                                refreshTrigger={refreshTrigger}
                                handleEditNews={handleEditNews}
                                handleDeleteRequest={handleDeleteRequest}
                            />
                        }
                    />
                    <Route
                        path="/news/:id"
                        element={
                            <NewsDetailPage
                                handleEditNews={handleEditNews}
                                handleDeleteRequest={handleDeleteRequest}
                            />
                        }
                    />
                    <Route path="*" element={<h1 className="text-center text-dark mt-5">404 - Página no encontrada</h1>} />
                </Routes>
            </main>

            {notification && (
                <NotificationToast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
            )}

            <Modal isOpen={isFormModalOpen} onClose={handleFormClose} title={editingNews ? "Editar Noticia" : "Crear Noticia"}>
                <NewsForm newsToEdit={editingNews} onSave={handleNewsSaved} onClose={handleFormClose} />
            </Modal>

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar esta noticia? Esta acción es irreversible."
            />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
}

export default MainContent; 