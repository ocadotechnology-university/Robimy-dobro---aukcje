import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import API from "../services/API"

interface AuthContextType {
    accessToken: string | null;
    loginWithGoogle: (googleToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const loginWithGoogle = async (googleToken: string) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/google/signup",
                { credentials: googleToken },
                {withCredentials: true}
            );
            console.log(response.data.accessToken);
            setAccessToken(response.data.accessToken);
        } catch (error) {
            console.error("Google login failed:", error);
            setAccessToken(null);
            throw error;
        }
    };

    useEffect(() => {
        const requestInterceptor = API.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                    console.log("Added token to request:", config.headers.Authorization);
                } else {
                    console.log("No accessToken available.");
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            API.interceptors.request.eject(requestInterceptor);
        };
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
};
