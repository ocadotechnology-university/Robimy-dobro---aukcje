import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import API from "../services/API"
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    role: string;
    sub: string;
}

interface AuthContextType {
    accessToken: string | null;
    role: string | null;
    supplier: string | null;
    loginWithGoogle: (googleToken: string) => Promise<void>;
    logout: () => void;
    profileImageURL: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return context;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [supplier, setSupplier] = useState<string | null>(null);
    const navigate = useNavigate();
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null);
    let refreshPromise: Promise<string> | null = null;

    const decodeAndSetTokenData = (token: string) => {
        const decoded: JwtPayload = jwtDecode(token);
        setRole(decoded.role);
        setSupplier(decoded.sub);
    };

    const loginWithGoogle = async (googleToken: string) => {
        try {
            const decoded: any = jwtDecode(googleToken);
            setProfileImageURL(decoded.picture);
            const response = await axios.post(
                "http://localhost:8080/api/auth/google/signup",
                {credentials: googleToken},
                {withCredentials: true}
            );
            const token = response.data.accessToken;
            console.log(token);
            setAccessToken(token);
            decodeAndSetTokenData(token);
        } catch (error) {
            console.error("Google login failed:", error);
            logout();
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/logout", null, {
                withCredentials: true
            });
            setAccessToken(null);
            setRole(null);
            setSupplier(null);
            navigate("/auth");
        } catch (error) {
            console.error("Logout failed", error);
        }
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
                                decodeAndSetTokenData(newToken);
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
        <AuthContext.Provider value={{accessToken, role, supplier, loginWithGoogle, logout, profileImageURL}}>
            {children}
        </AuthContext.Provider>
    );
};
