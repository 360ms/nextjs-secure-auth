import { Pool } from 'pg';

const { PG_CONNECTION_STRING, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

const db = new Pool({
    connectionString: PG_CONNECTION_STRING,

    //     OR ⬇
    //
    //     user: PG_USER,
    //     password: PG_PASSWORD,
    //     host: PG_HOST,
    //     port: PG_PORT || 5432,
    //     database: PG_DATABASE,
});

export default db;
