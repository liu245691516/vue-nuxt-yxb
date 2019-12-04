import Cookies from 'js-cookie';

//默认图片
export const defaultImg = {
    methods:{
        imgShow(url){
            return url= url=='' ? require('../assets/image/logo_w_t.svg') : url;
        }
    }
}