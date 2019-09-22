var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var S3Plugin = require('webpack-s3-plugin');
var credsDev = require('./aws-credentials-dev.json');
var entryPoint = path.resolve(__dirname, 'index.js');

module.exports = function (env){
  const isDevEnv = env.NODE_ENV === "development";
  const creds = credsDev;
  const isBuild = env.PROCESS.includes('build');
  const port = 3000;

  console.log(`🔥 Running Node Tasks on ${isDevEnv ? "Development" : "Production"} Environment.`);
  console.log(`🔥 lens-react will run on ${isDevEnv ? "Development" : "Production"} Environment.`);

  var plugins = [
    new HtmlWebpackPlugin({
      title: 'lens-react',
      template: 'index.html',
      filename: 'index.html'
    })
  ];

  var buildPlugins = [
      new S3Plugin({
        s3Options: {
          accessKeyId: creds.accesskey,
          secretAccessKey: creds.secretKey
        },
        s3UploadOptions: {
          Bucket: creds.bucket,
          ContentEncoding(fileName) {
            if (/\.gz/.test(fileName))
              return 'gzip'
          },
          ContentType(fileName) {
            if (/\.svg/.test(fileName))
              return 'image/svg+xml'
          }
        },
        cloudfrontInvalidateOptions: {
          DistributionId: creds.distributionId,
          Items: ["/*"]
        }
      })
    ];

  if(isBuild){
    plugins = [...plugins, ...buildPlugins];
  }

  var config = {
    entry: entryPoint,
    devtool: "cheap-module-source-map",
    devServer: {
      port: port,
      disableHostCheck: true,
      historyApiFallback: true,
      https: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(css)$/,
          use: [
            'style-loader',
            'css-loader?importLoaders=2'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|ttf)/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff2?)$/,
          loader: 'file-loader'
        },
        {
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }]
        }
      ]
    },
    plugins: plugins,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };


  return config;
};
