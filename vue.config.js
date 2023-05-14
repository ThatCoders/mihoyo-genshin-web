module.exports = {
    publicPath: "/",
    pages: {
        //（1）输出一个页面
        //  main: {
        //    entry: 'src/main.js',
        //    template: 'public/index.html',
        //    filename: 'maker.html',
        //    chunks: ['chunk-vendors', 'chunk-common', 'index']
        //  },

        //（2）输出多个页面
        move: {
            template: "public/move.html",
            entry: "src/views/move/move.main.js",
            filename: "move.html",
            title: "move",
            chunks: ['chunk-vendors', 'chunk-common', 'move'],
        },
        index: {
            template: "public/index.html",
            entry: "src/main.js",
            filename: "index.html",
            title: "index",
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    css: {
        loaderOptions: {
          sass: {
            data: `
              @import "./src/views/move/move.scss";
            `,
          },
        },
      },
};
