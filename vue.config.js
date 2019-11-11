module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/patiro_task/' : '/'
};
