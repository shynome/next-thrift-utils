
import { HelloSvc } from "./codegen";

import { createThriftServer, thriftApiPageConfig, ThriftServer, handleThriftServer } from "../../../";
import { createWebServer } from "@shynome/thrift-server";
export { thriftApiPageConfig as config }
import { echo as _echo, echo } from "./echo";
import thrift from "thrift";

const getHandler: () => HelloSvc.IHandler = () => ({
  echo: (ctx, ...args) => {
    return echo(...args)
  }
})

export class HelloService implements ThriftServer {
  server = createThriftServer(HelloSvc.Processor, getHandler())
  server2 = createWebServer({
    services: {
      '/': {
        // @ts-ignore
        transport: thrift.TBufferedTransport, protocol: thrift.TJSONProtocol,
        processor: HelloSvc,
        handler: getHandler(),
      }
    }
  })
  httpHandle = handleThriftServer(this.server)
}

export const service = new HelloService()

export default service.httpHandle
