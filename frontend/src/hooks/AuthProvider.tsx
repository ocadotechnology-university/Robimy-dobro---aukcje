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
    const navigate = useNavigate();
    let refreshPromise: Promise<string> | null = null;

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
            logout();
            throw error;
        }
    };

    const logout = () => {
        setAccessToken(null);
        navigate("/auth");
    }

    useEffect(() => {
        const requestInterceptor = API.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${accessToken}`;
                console.log("Added token to request:", config.headers.Authorization);
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            API.interceptors.request.eject(requestInterceptor);
        };
    }, [accessToken]);

    useEffect(() => {
        const responseInterceptor = API.interceptors.response.use(
            response => response,
            async error => {
                if (error.response?.status === 440) {
                    logout();
                    return Promise.reject(error);
                }

                if (error.response?.status === 401) {
                    try {
                        if (!refreshPromise) {
                            refreshPromise = axios.post('http://localhost:8080/api/auth/refresh', null, {
                                withCredentials: true,
                            }).then(res => {
                                const newToken = res.data;
                                setAccessToken(newToken);
                                console.log("New access token: " + newToken);
                                return newToken;
                            }).finally(() => {
                                refreshPromise = null;
                            });
                        }
                        const newAccessToken = await refreshPromise;
                        error.config.headers = {
                            ...error.config.headers,
                            Authorization: `Bearer ${newAccessToken}`,
                        };
                        return API(error.config);
                    } catch (refreshError) {
                        console.error("Refresh failed:", refreshError);
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            API.interceptors.response.eject(responseInterceptor);
        };
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
};
