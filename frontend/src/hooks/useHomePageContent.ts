import {useEffect, useState} from "react";

type HomePageContent = {
    year: number;
    slackChannel: string;
    stats: {
        funds: number;
        auctions: number;
        supliers: number;
        szlachetna: number;
        zobaczMnie: number;
    };
};

export const useHomePageContent = () => {
    const [data, setData] = useState<HomePageContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/HomePageContent.json')
            .then(res => {
                if (!res.ok) throw new Error('Błąd ładowania danych');
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return {data, loading, error};
};
