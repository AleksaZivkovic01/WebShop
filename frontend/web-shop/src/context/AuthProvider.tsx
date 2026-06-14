import {
    useState,
    useEffect,
    type ReactNode
} from "react";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
    children
}: {
    children: ReactNode;
}) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const login = (jwtToken: string) => {
        setToken(jwtToken);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};