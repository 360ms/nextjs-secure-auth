<br />
<p align="center">
  <h3 align="center">Next.js secure auth</h3>
  <p align="center">
    Secure auth with JWT, CSRF, PostgreSQL and Typescript
    <br />
    <a href="https://nextjs-secure-auth.vercel.app">View Demo</a>
  </p>
</p>

### Built With

-   [Next.js](https://nextjs.org)
-   [TypeScript](https://www.typescriptlang.org)
-   [Bootstrap](https://getbootstrap.com)
-   [ReactBootstrap](https://react-bootstrap.github.io)
-   [JsonWebToken](https://jwt.io)
-   [PostgreSQL](https://www.postgresql.org)
-   [CSRF](https://www.npmjs.com/package/csrf)
-   ...

## Getting Started

To get a local copy up and running follow these simple example steps.
<br />

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/360ms/nextjs-secure-auth.git
    ```

2. Go to project folder

    ```sh
    cd nextjs-secure-auth
    ```

3. Install NPM packages

    ```sh
    npm install
    ```

4. Create `users` table

    ```sql
    CREATE TABLE users(
    	id SERIAL PRIMARY KEY,
    	name VARCHAR(255),
    	email VARCHAR(255),
    	password VARCHAR(255)
    );
    ```

5. Rename `.env.local` to `.env` and configure

    ```JS
    JWT_SECRET=
    NEXT_PUBLIC_URL=

    PG_CONNECTION_STRING=
    // or
    PG_USER=
    PG_PASSWORD=
    PG_HOST=
    PG_PORT=
    PG_DATABASE=
    ```

6. Run the project

    ```sh
    npm run dev
    ```
