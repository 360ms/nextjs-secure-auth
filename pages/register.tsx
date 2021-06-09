import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Context } from '../context';
import axios from 'axios';

import { Jumbotron, Form, Button, Container } from 'react-bootstrap';

const RegisterPage: NextPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const {
        state: { user },
    } = useContext(Context);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            const {
                data: { message },
            } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/register`, form);

            toast.success(message);
            router.push('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Jumbotron>
                <h1 className="text-center">Register</h1>
            </Jumbotron>

            <Container>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    className="w-100 p-2"
                    variant="primary"
                    disabled={!form.name || !form.email || !form.password}
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </Container>
        </div>
    );
};

export default RegisterPage;
