const path = require('path');
const AssetsManifestPlugin = require('webpack-assets-manifest');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    cache: true,
    target: 'web',
    mode: process.env.NODE_ENV,
    devtool: isProduction ? false : (process.env.DEVTOOL || 'eval-source-map'),
    performance: {
        hints: false,
    },
    entry: ['react-hot-loader/patch', './resources/scripts/index.tsx'],
    output: {
        path: path.join(__dirname, '/public/assets'),
        filename: isProduction ? 'bundle.js' : 'bundle.js',
        chunkFilename: isProduction ? '[name].js' : '[name].js',
        publicPath: (process.env.WEBPACK_PUBLIC_PATH || '/assets/'),
        crossOriginLoading: 'anonymous',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.(png|jp(e?)g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            }
        ],
    },
    stats: {
        // Ignore warnings emitted by "source-map-loader" when trying to parse source maps from
        // JS plugins we use, namely brace editor.
        warningsFilter: [/Failed to parse source map/],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': path.join(__dirname, '/resources/scripts'),
        },
        symlinks: false,
    },
    externals: {
        // Mark moment as an external to exclude it from the Chart.js build since we don't need to use
        // it for anything.
        moment: 'moment',
    },
    plugins: [
        new AssetsManifestPlugin({ writeToDisk: true, publicPath: true, integrity: true, integrityHashes: ['sha384'] }),
        process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin({
            analyzerHost: '0.0.0.0',
            analyzerPort: 8081,
        }) : null
    ].filter(p => p),
    optimization: {
        usedExports: true,
        sideEffects: false,
        runtimeChunk: false,
        removeEmptyChunks: true,
        minimize: isProduction,
    },
    watchOptions: {
        poll: 1000,
        ignored: /node_modules/,
    },
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, '/public'),
        publicPath: process.env.WEBPACK_PUBLIC_PATH || '/assets/',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
