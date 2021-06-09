import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (Component) => {
    return (props) => {
        const [isOk, setIsOk] = useState<boolean>(false);

        const router = useRouter();

        useEffect(() => {
            handleUserFetch();
        }, []);

        const handleUserFetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/current_user`);
                if (data.ok) {
                    setIsOk(true);
                }
            } catch (error) {
                setIsOk(false);
                router.push('/login');
            }
        };

        return isOk && <Component {...props} />;
    };
};

export default withAuth;
