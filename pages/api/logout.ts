import type { NextApiResponse } from 'next';

import { setCookie } from './../../utils/cookies';

export default (_, res: NextApiResponse) => {
    try {
        setCookie(res, 'token', '', { maxAge: -1 });
        return res.json({ ok: true, message: 'Logout success!' });
    } catch ({ message }) {
        return res.status(400).json({ ok: false, message });
    }
};
