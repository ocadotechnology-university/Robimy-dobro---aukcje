import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

    const validateToken = useCallback(async (token: string): Promise<boolean> => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/test", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        setAccessToken(null);
        navigate('/auth', { replace: true });
    }, [navigate]);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            async (config) => {
                if (accessToken) {
                    // Verify token before each request
                    const isValid = await validateToken(accessToken);
                    if (!isValid) {
                        logout();
                        return Promise.reject(new Error('Token expired'));
                    }

                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => axios.interceptors.request.eject(requestInterceptor);
    }, [accessToken, validateToken, logout]);

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(responseInterceptor);
    }, [logout]);

    const loginWithGoogle = async (googleToken: string) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/google/signup",
                { credentials: googleToken },
                {withCredentials: true}
            );
            setAccessToken(response.data.accessToken);
        } catch (error) {
            console.error("Google login failed:", error);
            setAccessToken(null);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
};
