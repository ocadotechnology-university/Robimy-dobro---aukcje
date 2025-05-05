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
export const imagePostAPI = (blob: Blob) => {
    const form = new FormData();
    form.append('file', blob);
    return API.post(`/images/`, form, { responseType: 'text' });
}
export const auctionsAPI = (filters?: AuctionFilters) => API.get<Auction[]>('/auctions', { params: filters });
export const auctionPostAPI = (newAuction: AddAuction) => API.post('/auctions', newAuction);
export const auctionUpdateAPI = (auctionId: string, updateAuction: AddAuction) => API.patch(`/auctions/${auctionId}/update`, updateAuction);
export default API;
