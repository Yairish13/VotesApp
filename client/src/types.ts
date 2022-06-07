import * as SocketIOClient from 'socket.io-client';

export interface IColor extends Document {
    _id: string,
    colorCode:string,
    colorName:string,
    votes:number
}


export type ApiDataType = {
    message: string
    status: string
    colors: IColor[]
    color?: IColor,
    votes?:number
  }

  export interface ISocketController {
    connect: () => void;
    disconnect: () => void;
    socket: SocketIOClient.Socket | null;
    isReady: boolean;
    subscribe: (event: string, cb: () => any) => void;
    emit: (event: string, data: any, cb: () => any) => void;
  }