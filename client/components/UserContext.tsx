import { createContext } from 'react';

export const UserContext = createContext({
    userLoggedIn: false,
    setUserLoggedIn: (value: boolean) => {},
});
