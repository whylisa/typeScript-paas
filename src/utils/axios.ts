import axios from 'axios';
let service: any = {};
if (process.env.NODE_ENV === 'development') {
    service = axios.create({
        baseURL: 'http://192.168.1.198/sioo-admin-web',
        timeout: 20000,
    });
} else {
    service = axios.create({
        baseURL: 'http://192.168.1.198/sioo-admin-web',
        timeout: 20000,
    });
}
service.interceptors.request.use(
    (config: any) => {
        if (sessionStorage.getItem('myToken_admin')) {
            config.headers['X-Auth-Token'] = sessionStorage.getItem('myToken_admin')
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    },
);
service.interceptors.response.use(
    (res: any) => {
        return res;
    },
    (err: any) => {
        return Promise.reject(err);
    },
);
export default service;
