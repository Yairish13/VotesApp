import { API_HOST} from '../bin';
import * as SocketIOClient from 'socket.io-client';
import {ISocketController} from '../types';


class SocketController implements ISocketController {
  isReady = false;
  socket = {} as SocketIOClient.Socket;
  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
  }



  subscribe<T>(event: string, cb: (arg0: T) => void) {
    if (!this.isReady) {
      setTimeout(() => this.subscribe(event, cb), 1000);
      return;
    }
    this.unsubscribe(event);
    this.socket.on(event, cb);
  }

  unsubscribe(event: string) {
    if (!this.isReady) return;
    if (Array.isArray(event)) event.forEach(e => this.socket.off(e));
    else this.socket.off(event);
  }

  emit(event: string, data = {}, cb = ()=>{}) {
    if (!this.isReady) return;
    this.socket.emit(event, data, cb);
  }

  async connect() {
    this.socket = SocketIOClient.io(API_HOST);
    this.isReady = true;
  }

  disconnect() {
    if (this.socket) {
      this.socket?.disconnect?.();
    }
    this.socket = {} as SocketIOClient.Socket;
    this.isReady = false;
  }


}
export const socketController = new SocketController();