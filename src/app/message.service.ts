import { Injectable } from '@angular/core';
import {Message} from "primeng/primeng";

@Injectable()
export class MessageService {

  public messages: Message[] = [];
  public life:	number=	8000
  public sticky: boolean
  constructor() { }

  public add(message: Message) {
    this.messages.push(message);
  }

  public success(summary: string, detail: string) {
    this.add({severity: 'success', summary: summary, detail: detail});
  }

  public info(summary: string, detail: string) {
    this.add({severity: 'info', summary: summary, detail: detail});
  }

  public warn(summary: string, detail: string) {
    this.add({severity: 'warn', summary: summary, detail: detail});
  }

  public error(summary: string, detail: string) {
    this.add({severity: 'error', summary: summary, detail: detail});
  }

  public clear() {
    this.messages = [];
  }

}
