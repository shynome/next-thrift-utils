// @ts-check

const thrift = require("thrift");

/**
 * @type {import('./index').createThriftServer}
 */
export const createThriftServer = (processor, handler) => thrift.createWebServer({
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
export const thriftApiPageConfig = { api: { bodyParser: false } }

/**
 * @type {import('./index').handleThriftServer}
 */
export const handleThriftServer = (server) => (req, res) => {
  req.url = '/'
  server.emit('request', req, res)
}
