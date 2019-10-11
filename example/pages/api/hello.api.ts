
import { HelloSvc } from "./codegen";

import { createThriftServer, thriftApiPageConfig, ThriftServer, handleThriftServer } from "../../../";
export { thriftApiPageConfig as config }
import { echo as _echo, echo } from "./echo";

const getHandler: () => HelloSvc.IHandler = () => ({
  echo: (ctx, ...args) => {
    return echo(...args)
  }
})

export class HelloService implements ThriftServer {
  server = createThriftServer(HelloSvc.Processor, getHandler())
  httpHandle = handleThriftServer(this.server)
}

export const service = new HelloService()

export default service.httpHandle
