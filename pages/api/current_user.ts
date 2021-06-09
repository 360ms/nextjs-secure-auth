import type { NextApiResponse } from 'next';

import { verify } from 'jsonwebtoken';
import db from '../../utils/db';

export const authenticated = (fn) => async (req, res) => {
    verify(req.cookies.token, process.env.JWT_SECRET, async (err, decoded) => {
        if (!err && decoded) {
            return await fn(req, res, decoded);
        }

        return res.status(401).json({ ok: false, message: 'Unauthorized' });
    });
};

export default authenticated(async (_, res: NextApiResponse, decoded) => {
    try {
        const { rows } = await db.query('SELECT name, email FROM users WHERE email = $1', [
            decoded.email,
        ]);

        return res.json({ ok: true, user: rows[0] });
    } catch ({ message }) {
        return res.status(401).json({ ok: false, message });
    }
});
