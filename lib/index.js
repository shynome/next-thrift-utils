// @ts-check

const { createWebServer } = require("@shynome/thrift-server");
const thrift = require('thrift')

/**
 * @type {import('./index').createThriftServer}
 */
exports.createThriftServer = (processor, handler) => createWebServer({
  services: {
    '/': {
      // @ts-ignore
      transport: thrift.TBufferedTransport, protocol: thrift.TJSONProtocol,
      processor: processor,
      handler: handler,
    }
  }
})

/**
 * @type {import('next').PageConfig}
 */
exports.thriftApiPageConfig = { api: { bodyParser: false } }

/**
 * @type {import('./index').handleThriftServer}
 */
exports.handleThriftServer = (server) => (req, res) => {
  req.url = '/'
  server.emit('request', req, res)
}
