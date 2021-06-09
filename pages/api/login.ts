import type { NextApiRequest, NextApiResponse } from 'next';

import validateRequestBody from '../../utils/validateRequestBody';
import { applyMiddlewares } from '../../utils/applyMiddlewares';
import { setCookie } from '../../utils/cookies';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import db from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await applyMiddlewares(req, res);

    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            const validationResult = validateRequestBody(req.body);
            const isValid = !validationResult.length;
            if (!isValid) {
                return res.status(400).json({ ok: false, message: validationResult });
            }

            const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = rows[0];

            if (!user) {
                return res.status(400).json({ ok: false, message: 'User not found!' });
            }

            const isPasswordMatch = await compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ ok: false, message: 'Wrong email or password!' });
            }

            const token = sign({ name: user.name, email }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            setCookie(res, 'token', token, {
                httpOnly: true,
                secure: process.env.NODE === 'production',
            });

            return res.json({ ok: true, user: { name: user.name, email } });
        } catch ({ message }) {
            return res.status(400).json({ ok: false, message });
        }
    }
};
