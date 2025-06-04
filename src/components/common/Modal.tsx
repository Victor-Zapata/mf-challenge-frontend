import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <BootstrapModal show={isOpen} onHide={onClose} centered size="lg">
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {children}
            </BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default Modal;