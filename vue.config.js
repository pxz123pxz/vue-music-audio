module.exports = {
  pages: {
    index: {
      // page的入口
      entry: 'src/main.js'
    }
  },
  productionSourceMap:false,
  lintOnSave: false, //关闭语法检查，
  //代理跨域
  devServer: {
    proxy: 'http://127.0.0.1:5000'
  },
    
}