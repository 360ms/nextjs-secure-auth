import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';

import { useContext, useEffect, useState } from 'react';
import { Context, login } from '../context';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Jumbotron, Form, Button, Container } from 'react-bootstrap';

const LoginPage: NextPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const { state, dispatch } = useContext(Context);

    const router = useRouter();

    useEffect(() => {
        if (state.user) {
            router.push('/profile');
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            const {
                data: { user },
            } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/login`, form);

            dispatch(login(user));
            window?.localStorage?.setItem('user', JSON.stringify(user));
            toast.success(`Welcome, ${user.name}`);
            router.push('/profile');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Jumbotron>
                <h1 className="text-center">Login</h1>
            </Jumbotron>

            <Container>
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
                    disabled={!form.email || !form.password}
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </Container>
        </div>
    );
};

export default LoginPage;
