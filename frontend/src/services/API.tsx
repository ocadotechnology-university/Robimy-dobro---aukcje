import axios from 'axios';
import {Auction} from '../components/AuctionPage/Auction'
import {AuctionFilters} from "./fetchAuctions"

const API = axios.create({
    baseURL: '/api',
});

export const auctionsAPI = (filters?: AuctionFilters) => API.get<Auction[]>('/auction', { params: filters });