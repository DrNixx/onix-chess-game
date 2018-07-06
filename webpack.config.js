const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const rechartLibs = ["recharts", "d3-interpolate", "d3-scale", "d3-shape"]; 

module.exports = {
    stats: "verbose",
    mode: 'development',
    devtool: 'source-map', 

    entry: {
        app: ["./src/index.ts"],
        tests: ["./src/test/index.ts"]
    },

    output: {
        libraryTarget: "umd",
        library: "onix",
        crossOriginLoading: "anonymous",
        path: path.join(__dirname, "public/js"),
        publicPath: 'js/',
        chunkFilename: 'game.[name].js',
        filename: "game.[name].js"
    },

    plugins: [
        new CleanWebpackPlugin(['public/js'])
    ],

    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            chunks: 'all',
            //name: false,
            /*
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                },
                recharts: {
                    test: function(chunk) {
                        var request = chunk.rawRequest;
                        return rechartLibs.indexOf(request) !== -1;
                    },
                    name: "recharts"
                }
            }
            */
        }
   },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { configFile: 'tsconfig.webpack.json' },
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};