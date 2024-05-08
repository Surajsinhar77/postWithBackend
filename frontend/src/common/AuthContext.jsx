import { useState } from "react";
import { useContext, createContext } from "react";


const authContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedData = localStorage.getItem('user');
        return storedData ? JSON.parse(storedData) : null;
    });
    // const [user, setUser] = useState(null);

    function login(user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user))

    }

    function logoutForFrontend() {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <authContext.Provider value={
            {
                user,
                login,
                logoutForFrontend,
            }
        }>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);



