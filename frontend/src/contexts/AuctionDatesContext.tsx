import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {fetchAuctionDates} from '../services/fetchAuctionDates';

interface AuctionDatesContextType {
    dates: Date[];
    loading: boolean;
    error: string | null;
}

const AuctionDatesContext = createContext<AuctionDatesContextType>({
    dates: [],
    loading: true,
    error: null,
});

export const useAuctionDates = () => useContext(AuctionDatesContext);

export const AuctionDatesProvider = ({children}: { children: ReactNode }) => {
    const [dates, setDates] = useState<Date[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAuctionDates()
            .then(setDates)
            .catch(() => setError('Błąd podczas pobierania dat'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuctionDatesContext.Provider value={{dates, loading, error}}>
            {children}
        </AuctionDatesContext.Provider>
    );
};
