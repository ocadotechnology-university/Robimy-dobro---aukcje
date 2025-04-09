import axios from 'axios';
import {Auction} from '../AuctionPage/Auction'

const API = axios.create({
    baseURL: '/api',
});

export const auctionsAPI = () => API.get<Auction[]>('/auction');