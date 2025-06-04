import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

interface HeaderProps {
    onNewNewsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewNewsClick }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-white">
                    Mindfactory Noticias
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Button variant="outline-light" className="ms-auto" onClick={onNewNewsClick}>
                        + Crear Noticia
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;