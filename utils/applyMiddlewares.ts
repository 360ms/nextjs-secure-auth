import cors from 'cors';

export const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (res) => {
            if (res instanceof Error) {
                return reject(res);
            }

            return resolve(res);
        });
    });
};

export const applyMiddlewares = async (req, res) => {
    await runMiddleware(req, res, cors());
};
