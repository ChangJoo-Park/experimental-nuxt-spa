module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  serverMiddleware: ['~/api/logger-middleware', '~/api/router-middleware'],
  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', 'animate.css/animate.min.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/directives.client.js',
    '~/plugins/nuxt-client-init.client.js',
    '~/plugins/repository.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  moment: {
    locales: ['ko']
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: ''
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
