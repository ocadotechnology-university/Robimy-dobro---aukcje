import axios from 'axios';
import {Auction} from '../components/AuctionPage/Auction'
import {AuctionFilters} from "./fetchAuctions"
import {AddAuction} from '../components/AddPage/AddAuction'
import qs from 'qs';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export const imageAPI = (fileId: string) => API.get(`/images/${fileId}`, { responseType: 'blob' });
export const auctionsAPI = (filters?: AuctionFilters) => API.get<Auction[]>('/auctions', { params: filters });
export const auctionPostAPI = (newAuction: AddAuction) => API.post('/api/add', newAuction);
export default API;
