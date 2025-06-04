import React, { useState, useEffect } from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons'; 

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Muestra/oculta el botón basado en el scroll
    const toggleVisibility = () => {
        if (window.scrollY > 300) { // Muestra el botón si el scroll es mayor a 300px
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Hace scroll al inicio de la página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        // Limpia el event listener cuando el componente se desmonta
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`btn btn-primary rounded-circle shadow ${isVisible ? 'd-block' : 'd-none'}`}
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000, 
                width: '50px', 
                height: '50px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
            aria-label="Volver arriba"
        >
            <ArrowUpShort size={24} /> 
        </button>
    );
};

export default ScrollToTopButton;