import type { NextApiRequest, NextApiResponse } from 'next';

import validateRequestBody from '../../utils/validateRequestBody';
import { applyMiddlewares } from '../../utils/applyMiddlewares';
import db from '../../utils/db';
import bcrypt from 'bcryptjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await applyMiddlewares(req, res);

    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            const validationResult = validateRequestBody(req.body);
            const isValid = !validationResult.length;
            if (!isValid) {
                return res.status(400).json({ ok: false, message: validationResult });
            }

            const isEmailExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (isEmailExists.rows.length) {
                return res.status(400).json({ ok: false, message: 'Email already exists!' });
            }

            const hashPassword = await bcrypt.hash(password, 9);

            const createUser = await db.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, hashPassword],
            );

            if (createUser.rows.length) {
                return res.json({ ok: true, message: 'User successfully registered!' });
            }

            return res.status(400).json({ ok: false, message: 'Something went wrond!' });
        } catch ({ message }) {
            return res.status(400).json({ ok: false, message });
        }
    }
};
