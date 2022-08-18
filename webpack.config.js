const path = require("path");

module.exports = {
    mode: "development",
    entry: "./app/index.tsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, "../public/admin/public"),     // путь к каталогу выходных файлов - папка public
        publicPath: "/public/",
        filename: "bundle.js"       // название создаваемого файла
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 80,
        open: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [ //загрузчик для jsx
            {
                test: /\.tsx?$/,
                use:  'ts-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    },

}