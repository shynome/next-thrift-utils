// @ts-check

const thrift = require("@shynome/thrift-server");

/**
 * @type {import('./index').createThriftServer}
 */
exports.createThriftServer = (processor, handler) => thrift.createWebServer({
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
