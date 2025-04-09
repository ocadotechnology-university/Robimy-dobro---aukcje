import { useState, useEffect } from 'react';
import { auctionsAPI } from '../API/API';
import {Auction} from '../AuctionPage/Auction'


export const useGetAuctions = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        auctionsAPI()
            .then(response => {
                setAuctions(response.data);
            })
            .catch(error => {
                setError('Error - auction is not available');
                console.error('Error', error);
            });
    }, []);

    return { auctions, error };
};