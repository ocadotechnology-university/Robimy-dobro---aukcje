import axios from 'axios';
import {Auction} from '../components/AuctionPage/Auction'
import {AuctionFilters} from "./fetchAuctions"
import {AuctionDto} from '../components/AddPage/AuctionDto'
import qs from 'qs';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'}),
});

export const imageAPI = (fileId: string) =>
    API.get(`/images/${fileId}`, {responseType: 'blob'});

export const imagePostAPI = (blob: Blob) => {
    const form = new FormData();
    form.append('file', blob);
    return API.post(`/images/`, form, {responseType: 'text'});
}

export const auctionsAPI = (filters?: AuctionFilters) =>
    API.get<Auction[]>('/auctions', {params: filters});

export const auctionPostAPI = (newAuction: AuctionDto) =>
    API.post('/auctions', newAuction);

export const auctionUpdateAPI = (auctionId: string, updateAuction: AuctionDto) => 
    API.patch(`/auctions/${auctionId}/update`, updateAuction);

export const auctionUpdatePublicIdAPI = (auctionId: string, publicId: number | null) =>
    API.patch(`/auctions/${auctionId}/updatePublicId`, {publicId});

export const followAuctionAPI = (id: string) =>
    API.post(`/auctions/${id}/follow`);

export const unfollowAuctionAPI = (id: string) =>
    API.delete(`/auctions/${id}/follow`);

export const deleteAuctionAPI = (id: string) =>
    API.delete(`/auctions/${id}`);

export const auctionDatesAPI = () =>
    API.get<string[]>('/dates');

export default API;