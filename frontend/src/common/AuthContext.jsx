
import { useContext, createContext } from "react";


const authContext = createContext();

export default function AuthProvider({children}) {
    const user = null;

    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}

