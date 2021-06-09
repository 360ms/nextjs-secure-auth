import type { Dispatch } from 'react';

import { createContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const { NEXT_PUBLIC_URL } = process.env;

export interface UserData {
    name: string;
    email: string;
}
export interface State {
    user: UserData | null;
}
const INITIAL_STATE: State = {
    user: null,
};

export enum ActionType {
    Login,
    Logout,
}
export interface Login {
    type: ActionType.Login;
    payload: UserData;
}
export interface Logout {
    type: ActionType.Logout;
}
export type UserActions = Login | Logout;

const reducer = (state: State, action: UserActions): State => {
    switch (action.type) {
        case ActionType.Login:
            return { user: action.payload };

        case ActionType.Logout:
            return { user: null };

        default:
            return state;
    }
};

export const login = (user: UserData): Login => ({ type: ActionType.Login, payload: user });
export const logout = (): Logout => ({ type: ActionType.Logout });

const Context = createContext<{ state: State; dispatch: Dispatch<UserActions> }>({
    state: INITIAL_STATE,
    dispatch: () => undefined,
});

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(login(JSON.parse(window?.localStorage.getItem('user'))));
        }
    }, []);

    axios.interceptors.response.use(
        (res) => res,
        (err) => {
            const { response: res } = err;

            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((_, reject) => {
                    axios
                        .get(`${NEXT_PUBLIC_URL}/api/logout`)
                        .then(() => {
                            dispatch(logout());
                            window.localStorage.removeItem('user');
                            router.push('/login');
                        })
                        .catch((err) => reject(err));
                });
            }

            return Promise.reject(err);
        },
    );

    const getCsrfToken = async () => {
        const { data } = await axios.get(`${NEXT_PUBLIC_URL}/api/csrf_token`);
        axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };

    useEffect(() => {
        getCsrfToken();
    }, [getCsrfToken]);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
