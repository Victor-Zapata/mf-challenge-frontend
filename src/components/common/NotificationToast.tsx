// mfnews-frontend/src/components/common/NotificationToast.tsx
import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
// ¡CAMBIO AQUÍ! Importa desde react-bootstrap-icons
import { CheckCircleFill, ExclamationTriangleFill, InfoCircleFill } from 'react-bootstrap-icons';

interface NotificationToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, type, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getVariant = () => {
        switch (type) {
            case 'success': return 'success';
            case 'error':   return 'danger';
            case 'info':    return 'info';
            default:        return 'primary';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircleFill className="me-2" size={20} />; // Usamos CheckCircleFill
            case 'error':   return <ExclamationTriangleFill className="me-2" size={20} />; // Usamos ExclamationTriangleFill
            case 'info':    return <InfoCircleFill className="me-2" size={20} />; // Usamos InfoCircleFill
            default:        return null;
        }
    };

    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast bg={getVariant()} show={show} onClose={() => setShow(false)} delay={3000} autohide>
                <Toast.Body className="d-flex align-items-center text-white">
                    {getIcon()}
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default NotificationToast;