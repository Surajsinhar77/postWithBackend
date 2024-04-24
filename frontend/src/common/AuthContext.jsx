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

    function logoutForFrontend(){
        setUser(null);
        localStorage.setItem('user', null);
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

export const useAuth = () => {
    return useContext(authContext);
}


