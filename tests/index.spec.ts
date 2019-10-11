
import { HelloSvc } from "../example/pages/api/codegen";
import { echo } from "../example/pages/api/echo";
import thrift from "thrift";
import { Worker } from "worker_threads";
import path from "path";

const nextjsServerFilepath = path.join(__dirname, './server.js')

describe('next thrift utils', () => {

  let port: number
  let client: HelloSvc.Client
  let worker: Worker

  jest.setTimeout(60e3)

  beforeAll(async () => {

    port = await new Promise((rl, rj) => {
      const noShowWorkerLog = true
      worker = new Worker(nextjsServerFilepath, { stdout: noShowWorkerLog, stderr: noShowWorkerLog })
      worker
        .on('error', rj)
        .once('message', _port => {
          worker.removeListener('error', rj)
          rl(_port)
        })
    })

    let connection = thrift.createHttpConnection('127.0.0.1', port, {
      transport: thrift.TBufferedTransport, protocol: thrift.TJSONProtocol,
      path: '/api/hello'
    })
    client = thrift.createHttpClient(HelloSvc.Client, connection)

  })

  afterAll(async () => {
    await worker.terminate()
  })

  it('server', async () => {
    let r1: string = await client.echo()
    let e1: string = await echo()
    expect(r1).toBe(e1)
  })

})
