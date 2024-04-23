import { useState } from "react";
import { useContext, createContext } from "react";


const authContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const storedData = localStorage.getItem('user');
        return storedData ? storedData : null;
    });
    // const [user, setUser] = useState(null);

    function login(user) {
        console.log('login authContext', user)
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <authContext.Provider value={
            {
                user, 
                login
            }   
        }>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}


