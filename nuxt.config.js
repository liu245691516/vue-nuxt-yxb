import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '叮咚营销宝',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff6900',height: '2px' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/reset.less',
    '~assets/font/iconfont.css',
    'element-ui/lib/theme-chalk/loading.css',
    'element-ui/lib/theme-chalk/message.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/vue-swiper.js", ssr: false },
    { src: "~/plugins/element-ui.js", ssr: true },
    { src: "~/assets/font/iconfont.js", ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',

  ],

  env: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  },

  axios: {
    proxy: true
  },

  // 代理服务器
  proxy: {
    '/api': 'http://admin.yingxiaobao.org.cn/',
  },
  

  styleResources: {
    less: './assets/**/*.less'
  },
  


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: { allChunks: true },
    vendor: ['axios'],
    extend(config, ctx) {
    },
  },
  
  router:{
      middleware:'headers'
  },

}
