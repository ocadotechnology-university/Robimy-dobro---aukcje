import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {fetchCities} from '../services/fetchCities';
import {useAuth} from '../hooks/AuthProvider';

interface CityContextType {
    cities: string[];
    loading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
}

const CitiesContext = createContext<CityContextType>({
    cities: [],
    loading: true,
    error: null,
    fetch: async () => {
    },
});

export const useCities = () => useContext(CitiesContext);

export const CityProvider = ({children}: { children: ReactNode }) => {
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {isAxiosReady} = useAuth();

    const fetch = async () => {
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
        if (isAxiosReady) {
            fetch();
        }
    }, [isAxiosReady]);

    return (
        <CitiesContext.Provider value={{cities, loading, error, fetch}}>
            {children}
        </CitiesContext.Provider>
    );
};
