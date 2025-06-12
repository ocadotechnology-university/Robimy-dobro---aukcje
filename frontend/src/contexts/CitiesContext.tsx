import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {fetchCities} from '../services/fetchCities';
import {useAuth} from '../hooks/AuthProvider';

interface CityContextType {
    cities: string[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

const CitiesContext = createContext<CityContextType>({
    cities: [],
    loading: true,
    error: null,
    refetch: async () => {
    },
});

export const useCities = () => useContext(CitiesContext);

export const CityProvider = ({children}: { children: ReactNode }) => {
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {accessToken} = useAuth();

    const refetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCities();
            setCities(data);
        } catch {
            setError('Błąd podczas pobierania miast');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken) {
            refetch();
        }
    }, [accessToken]);

    return (
        <CitiesContext.Provider value={{cities, loading, error, refetch}}>
            {children}
        </CitiesContext.Provider>
    );
};
