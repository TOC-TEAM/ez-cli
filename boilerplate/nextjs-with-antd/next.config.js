const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, 'src/styles/antd-custom.less'),
    'utf8'
  )
)

const getPath = (...args) => {
  return path.join(__dirname, ...args)
}

const t = withSass(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    ...withCSS({
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/
          const origExternals = [...config.externals]
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback()
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback)
              } else {
                callback()
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ]

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          })
        }
        config.module.rules.push(
          {
            test: /\.(eot|woff|woff2|ttf)$/,
            use: {
              loader: 'file-loader',
              options: {
                limit: 1024,
                name: '[name].[hash].[ext]',
              },
            },
          },
          {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  esModule: false,
                  limit: 1024,
                  name: 'static/[name].[hash:8].[ext]',
                  publicPath: '/_next/',
                },
              },
            ],
          }
        )
        config.resolve.alias = {
          ...config.resolve.alias,
          '@styles': getPath('src/styles'),
          '@utils': getPath('src/utils'),
          '@layout': getPath('src/layout'),
          '@assets': getPath('src/assets'),
          '@components': getPath('src/components'),
        }
        return config
      },
    }),
  })
)

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
  ...t,
}
