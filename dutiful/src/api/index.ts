import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import Account from '@/services/account'
import { baseUrl } from '@/constants';


const _headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
    "I-Authentication": Account.authenticationToken(),
    "Connection": "keep-alive"
}

const _confing: AxiosRequestConfig = {
    baseURL: baseUrl + "api/",
    headers: _headers
}

export const changeConfigHeader = (key: any, value: string) => {
    _headers[key] = value;
};

export const apiCall = Axios.create(_confing)


