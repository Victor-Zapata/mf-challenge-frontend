import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap'; 

const Spinner: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
            <BootstrapSpinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Cargando...</span>
            </BootstrapSpinner>
        </div>
    );
};

export default Spinner;