// @ts-check

const path = require('path')
const next = require('next')
const { createServer } = require('http')

const { parentPort } = require('worker_threads')

// @ts-ignore
const nextjsServer = next({
  dev: true,
  dir: path.join(__dirname, '../example'),
})
const nextjsHandler = nextjsServer.getRequestHandler()
const server = createServer((req, res) => {
  nextjsHandler(req, res)
})

void async function main() {
  await nextjsServer.prepare().catch(err => {
    debugger
  })
  let port = await new Promise(rl => {
    server.listen(function () {
      rl(this.address().port)
    })
  })
  console.log('port:', port)
  parentPort.postMessage(port)
}()
