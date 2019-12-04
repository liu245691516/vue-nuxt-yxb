import axios from 'axios' //引用axios
import qs from 'qs';
import md5 from 'js-md5'
import Cookies from 'js-cookie';

// axios 配置
axios.defaults.timeout = 10000;
// axios.defaults.withCredentials = true;                   //设置header请求携带cookie
axios.defaults.baseURL = process.env.BASE_URL;        //设置请求域名
axios.defaults.crossDomain = true;
axios.defaults.async = true
// http request 拦截器，通过这个可以把Cookie传到后台
axios.interceptors.request.use(
    config => {
        let token = Cookies.get('access_token');
        let time = parseInt(new Date().getTime()/1000);
        let secret = 'N244pPLRqnCZQrGhngrZzcZiH3NJRP4Y';
        let appId = 'DingDong';
        let sign = md5(`appId=${appId}&time=${time}&secret=${secret}`);
        if(config.url.indexOf('?')>-1){
            config.url = `${config.url}&time=${time}&sign=${sign}`;
        }else{
            config.url = `${config.url}?time=${time}&sign=${sign}`;
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded' //设置跨域头部
        if(token){
            config.headers.Authorization = 'Token '+token
        }else if(axios.defaults.cookies && axios.defaults.cookies.access_token){
            config.headers.Authorization = 'Token '+axios.defaults.cookies.access_token
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


// http response 拦截器
axios.interceptors.response.use(
    response => {
        //response.data.errCode是接口返回的值，如果值为401，登录过期，然后跳转到登录页，
        if(response.data.code == 401) { 
            // Cookies.remove('access_token');
            // Cookies.remove('YXB_ID');
            // localStorage.clear();
            // location.href = '/';
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);

export default axios;

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        // var par = Object.assign(params)
        axios.get(url, {
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}

/**
 * delete 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {data:qs.stringify(data)})
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}


/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, qs.stringify(data))
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        if(data.id) url = `${url}/${data.id}`
        axios.put(url, qs.stringify(data))
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    })
}


