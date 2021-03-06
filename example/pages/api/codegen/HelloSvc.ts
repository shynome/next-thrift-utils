/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.8.1
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IEchoArgsArgs {
    name?: string;
}
export class EchoArgs {
    public name?: string;
    constructor(args?: IEchoArgsArgs) {
        if (args != null && args.name != null) {
            this.name = args.name;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("EchoArgs");
        if (this.name != null) {
            output.writeFieldBegin("name", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.name);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): EchoArgs {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_1: string = input.readString();
                        _args.name = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new EchoArgs(_args);
    }
}
export interface IEchoResultArgs {
    success?: string;
}
export class EchoResult {
    public success?: string;
    constructor(args?: IEchoResultArgs) {
        if (args != null && args.success != null) {
            this.success = args.success;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("EchoResult");
        if (this.success != null) {
            output.writeFieldBegin("success", thrift.Thrift.Type.STRING, 0);
            output.writeString(this.success);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): EchoResult {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 0:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_2: string = input.readString();
                        _args.success = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new EchoResult(_args);
    }
}
export class Client {
    public _seqid: number;
    public _reqs: {
        [name: number]: (err: Error | object | undefined, val?: any) => void;
    };
    public output: thrift.TTransport;
    public protocol: new (trans: thrift.TTransport) => thrift.TProtocol;
    constructor(output: thrift.TTransport, protocol: new (trans: thrift.TTransport) => thrift.TProtocol) {
        this._seqid = 0;
        this._reqs = {};
        this.output = output;
        this.protocol = protocol;
    }
    public incrementSeqId(): number {
        return this._seqid += 1;
    }
    public echo(name?: string): Promise<string> {
        const requestId: number = this.incrementSeqId();
        return new Promise<string>((resolve, reject): void => {
            this._reqs[requestId] = (error, result) => {
                delete this._reqs[requestId];
                if (error != null) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            };
            this.send_echo(name, requestId);
        });
    }
    public send_echo(name: string | undefined, requestId: number): void {
        const output: thrift.TProtocol = new this.protocol(this.output);
        output.writeMessageBegin("echo", thrift.Thrift.MessageType.CALL, requestId);
        const args: EchoArgs = new EchoArgs({ name });
        args.write(output);
        output.writeMessageEnd();
        this.output.flush();
        return;
    }
    public recv_echo(input: thrift.TProtocol, mtype: thrift.Thrift.MessageType, requestId: number): void {
        const noop = (): any => null;
        const callback = this._reqs[requestId] || noop;
        if (mtype === thrift.Thrift.MessageType.EXCEPTION) {
            const x: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException();
            x.read(input);
            input.readMessageEnd();
            return callback(x);
        }
        else {
            const result: EchoResult = EchoResult.read(input);
            input.readMessageEnd();
            if (result.success != null) {
                return callback(undefined, result.success);
            }
            else {
                return callback(new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, "echo failed: unknown result"));
            }
        }
    }
}
export interface IHandler<Context = any> {
    echo(context: Context, name?: string): string | Promise<string>;
}
export class Processor<Context = any> {
    public _handler: IHandler<Context>;
    constructor(handler: IHandler<Context>) {
        this._handler = handler;
    }
    public process(input: thrift.TProtocol, output: thrift.TProtocol, context: Context): void {
        const metadata: thrift.TMessage = input.readMessageBegin();
        const fname: string = metadata.fname;
        const requestId: number = metadata.rseqid;
        const methodName: string = "process_" + fname;
        switch (methodName) {
            case "process_echo": {
                this.process_echo(requestId, input, output, context);
                return;
            }
            default: {
                input.skip(thrift.Thrift.Type.STRUCT);
                input.readMessageEnd();
                const errMessage = "Unknown function " + fname;
                const err = new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN_METHOD, errMessage);
                output.writeMessageBegin(fname, thrift.Thrift.MessageType.EXCEPTION, requestId);
                err.write(output);
                output.writeMessageEnd();
                output.flush();
                return;
            }
        }
    }
    public process_echo(requestId: number, input: thrift.TProtocol, output: thrift.TProtocol, context: Context): void {
        new Promise<string>((resolve, reject): void => {
            try {
                const args: EchoArgs = EchoArgs.read(input);
                input.readMessageEnd();
                resolve(this._handler.echo(context, args.name));
            }
            catch (err) {
                reject(err);
            }
        }).then((data: string): void => {
            const result: EchoResult = new EchoResult({ success: data });
            output.writeMessageBegin("echo", thrift.Thrift.MessageType.REPLY, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        }).catch((err: Error): void => {
            const result: thrift.Thrift.TApplicationException = new thrift.Thrift.TApplicationException(thrift.Thrift.TApplicationExceptionType.UNKNOWN, err.message);
            output.writeMessageBegin("echo", thrift.Thrift.MessageType.EXCEPTION, requestId);
            result.write(output);
            output.writeMessageEnd();
            output.flush();
            return;
        });
    }
}
