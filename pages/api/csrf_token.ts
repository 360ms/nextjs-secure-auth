import { applyMiddlewares } from '../../utils/applyMiddlewares';
import Token from 'csrf';

export default (req, res) => {
    applyMiddlewares(req, res);

    const csrfToken = new Token().create(process.env.JWT_SECRET);

    return res.json({ csrfToken });
};
