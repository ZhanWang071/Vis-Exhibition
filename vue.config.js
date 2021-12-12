// module.exports = {
//   publicPath: './',
//   outputDir: 'docs',
//   configureWebpack: {
    
//   }
// }

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Vis-Exhibition/'
    : '/'
}
