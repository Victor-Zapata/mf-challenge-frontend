import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white text-center py-3 mt-auto">
            <div className="container">
                <p className="mb-0">
                    &copy; {currentYear} Víctor Zapata. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;