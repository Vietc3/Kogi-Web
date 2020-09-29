'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV:'"development"',
  URL_IMAGE:'"http://download.gihot.vn/gdk/"',
  ROOT_API:'"http://uat.gihot.vn:8080"'
})
