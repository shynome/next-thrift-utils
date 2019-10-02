
import thrift, { TProcessorConstructor } from "thrift";

import { Server } from "net";

export function createThriftServer<TProcessor, THandler>(processor: TProcessorConstructor<TProcessor, THandler>, handler: THandler): Server

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

export const thriftApiPageConfig: PageConfig = { api: { bodyParser: false } }

export const handleThriftServer = (server: Server) => (req: NextApiRequest, res: NextApiResponse) => any

export abstract class ThriftServer {
  public server: Server
  public httpHandle: (req: NextApiRequest, res: NextApiResponse) => void
}
