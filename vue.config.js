module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Side-Project__todoListv4/' // test(示範) 是github的專案名稱
      : '/',

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/all.scss";`,
      },
    },
  },
}
