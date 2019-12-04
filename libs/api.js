import { get, post, put, del } from './http'

//注册 - 获取注册验证码图片
export function getCaptchaImg(data) { return get('api/v1/site/register-captcha', data); }

//注册 - 发送短信验证码
export function registerSendCode(data) { return post('api/v1/sms/register', data); }

//注册 - 用户注册
export function register(data) { return post('api/v1/site/register', data); }

//登录 - 账号密码登录
export function userLoginApi(data) { return post('api/v1/site/login', data); }

//登录 - 验证码登录
export function codeLoginApi(data) { return post('api/v1/site/mobile-login', data); }

//登录 - 验证码登录 - 发送验证码 
export function loginSendCode(data) { return post('api/v1/sms/user-login', data); }

//登录 - 找回密码
export function retrievePassword(data) { return post('api/v1/site/alter-password', data); }

//登录 - 找回密码 - 发送验证码
export function retrievePasswordCode(data) { return post('api/v1/sms/alter-password', data); }


//用户发布需求
export function postDemand(data) { return post('api/v1/roof/demand', data); }

//获取栏目分类列表  scenario 首页获取二级传index，获取四级传other
export function getColumns(data) { return get('api/v1/roof/columns', data); }

//首页信息 
//adv	array	轮播图
//recommend_goods	array	推荐商品
//limited_goods	array	限时推广
export function indexInit(data) { return get('api/v1/roof/index', data); }

//导航栏列表
export function getNavTop(data) { return get('api/v1/roof/index/nav', data); }

//首页搜索
export function searchGoods(data) { return get('api/v1/roof/index/search', data); }

//底部footer 相关产品 电话 版权等
export function initFooter(data) { return get('api/v1/roof/index/foot', data); }


//营销学院 - 文章列表
export function getArticleList(data) { return get('api/addons/execute?route=article/index&addon=dd-article', data); }

//营销学院 - 文章详情
export function getArticleDetails(data) { return get('api/addons/execute?route=article/view&addon=dd-article', data); }

//营销学院 - 文章分类
export function getArticleTypeList(data) { return get('api/addons/execute?route=article-cate/index&addon=dd-article', data); }

//营销学院 - 提交营销问题 - 发送验证码
export function sendCode(data) { return post('api/v1/sms/answer', data); }

//营销学院 - 提交营销问题
export function submitQuestion (data) { return post('api/addons/execute?route=answer/create&addon=dd-article', data); }


//商品 - 列表  
export function getGoodsList(data) { return get('api/v1/roof/goods', data); }

//商品 - 筛选 - 价格  
export function getSortPrice(data) { return get('api/v1/roof/goods/price', data); }

//商品 - 详情 api/v1/roof/goods/1
export function goodsDetail(data) { return get('api/v1/roof/goods', data); }

//商品 - 收藏
export function collectGoodsApi(data) { return post('api/v1/roof/goods/favorite', data); }


//购物车 - 添加到购物车  
export function addCart(data) { return post('api/v1/member/cart', data); }

//购物车 - 购物车列表  
export function getCartList(data) { return get('api/v1/member/cart', data); }

//购物车 - 修改购物车  
export function updatedCart(data) { return put('api/v1/member/cart', data); }

//购物车 - 删除  
export function deleteCart(data) { return post('api/v1/member/cart/remove', data); }

//购物车 - 数量
export function getCartCount(data) { return get('api/v1/member/cart/cart-count', data); }

//购物车 - 支付购买页 购买前的预览页面
export function orderPayInfo(data) { return post('api/v1/order/pay/count', data); }

//购物车 - 获取支持的支付方式
export function getPayType(data) { return get('/api/v1/order/pay/pay-type', data); }

//购物车 - 订单支付
export function orderPay(data) { return post('/api/v1/order/pay/payment', data); }

//购物车 - 检测订单支付状态
export function orderPayStatus(data) { return get('/api/v1/order/pay/check-order', data); }


//解决方案 - 列表
export function solutionList(data) { return get('api/addons/execute?route=article-single/index&addon=dd-article', data); }

//解决方案 - 收藏
export function solutionCollect(data) { return post('api/addons/execute?route=article-single/favorite&addon=dd-article', data); }


//个人中心 - 获取省份/城市/地区
export function getRegion(data) { return get('api/v1/common/province/province', data); }

//个人中心 - 修改信息
export function updateInfo(data) { return post('api/v1/member/info/update-info', data); }

//个人中心 - 获取个人信息
export function getPersonalInfo(data) { return get('api/v1/member/info/personal', data); }

//个人中心 - 修改手机号 - 给新手机发送验证码
export function updatedTelSendCode(data) { return post('api/v1/sms/alter-mobile', data); }

//个人中心 - 修改手机号 
export function updatedTel(data) { return post('api/v1/member/info/alter-mobile', data); }

//个人中心 - 修改密码 
export function updatedPassword(data) { return post('api/v1/member/info/alter-password', data); }

//个人中心 - 产品收藏 - 列表  
export function getCollectProduct(data) { return get('api/v1/roof/goods/favorite-list', data); }

//个人中心 - 产品收藏 - 取消收藏 
export function cancelProductCollect(data, id) { return del(`api/v1/roof/goods/un-favorite?id=${id}`, data); }

//个人中心 - 解决方案收藏 - 列表 
export function getCollectSolution(data) { return get('api/addons/execute?route=article-single/favorite-list&addon=dd-article', data); }

//个人中心 - 解决方案收藏 - 取消收藏 
export function cancelSolutionCollect(data, id) { return get(`api/addons/execute?route=article-single/un-favorite&id=${id}&addon=dd-article`, data); }
