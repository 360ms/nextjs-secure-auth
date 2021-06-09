import type { NextPage } from 'next';

import withAuth from '../hoc/withAuth';
import { Context } from '../context';
import { useContext } from 'react';

import { Jumbotron } from 'react-bootstrap';

const ProfilePage: NextPage = () => {
    const {
        state: { user },
    } = useContext(Context);

    return (
        <Jumbotron>
            <h1>
                <pre>{JSON.stringify(user, null, 4)}</pre>
            </h1>
        </Jumbotron>
    );
};

export default withAuth(ProfilePage);
