import type { FC } from 'react';

import { Context, logout } from '../context';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import axios from 'axios';

import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

const Navigation: FC = () => {
    const router = useRouter();

    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    const handleLogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/logout`);
        window?.localStorage.removeItem('user');
        dispatch(logout());
        router.push('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    <a className="navbar-brand">Auth</a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    {user ? (
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} href="/profile">
                                <a className="nav-link">Dashboard</a>
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} href="/">
                                <a className="nav-link">Home</a>
                            </Nav.Link>
                            <Nav.Link as={Link} href="/login">
                                <a className="nav-link">Login</a>
                            </Nav.Link>
                            <Nav.Link as={Link} href="/register">
                                <a className="nav-link">Register</a>
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
