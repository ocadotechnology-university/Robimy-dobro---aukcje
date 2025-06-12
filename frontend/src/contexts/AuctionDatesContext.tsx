import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {fetchAuctionDates} from '../services/fetchAuctionDates';
import {useAuth} from "../hooks/AuthProvider";

interface AuctionDatesContextType {
    dates: Date[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

const AuctionDatesContext = createContext<AuctionDatesContextType>({
    dates: [],
    loading: true,
    error: null,
    refetch: async () => {},
});

export const useAuctionDates = () => useContext(AuctionDatesContext);

export const AuctionDatesProvider = ({children}: { children: ReactNode }) => {
    const [dates, setDates] = useState<Date[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        if (!accessToken) return;
        refetch();
    }, [accessToken]);

    const refetch = async () => {
        console.log("Refetch");
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
        <AuctionDatesContext.Provider value={{dates, loading, error, refetch}}>
            {children}
        </AuctionDatesContext.Provider>
    );
};
