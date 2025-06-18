import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {fetchAuctionDates} from '../services/fetchAuctionDates';
import {useAuth} from "../hooks/AuthProvider";

interface AuctionDatesContextType {
    dates: Date[];
    loading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
}

const AuctionDatesContext = createContext<AuctionDatesContextType>({
    dates: [],
    loading: true,
    error: null,
    fetch: async () => {
    },
});

export const useAuctionDates = () => useContext(AuctionDatesContext);

export const AuctionDatesProvider = ({children}: { children: ReactNode }) => {
    const [dates, setDates] = useState<Date[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {isAxiosReady} = useAuth();

    useEffect(() => {
        if (!isAxiosReady) return;
        fetch();
    }, [isAxiosReady]);

    const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAuctionDates();
            setDates(data);
        } catch {
            setError('Błąd podczas pobierania dat');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuctionDatesContext.Provider value={{dates, loading, error, fetch}}>
            {children}
        </AuctionDatesContext.Provider>
    );
};
