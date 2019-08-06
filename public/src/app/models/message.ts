import { IMessageUser, MessageUser } from './message-user';

export interface IMessage {
    date: string;
    fromUsername: IMessageUser;
    message: string;
}

export class Message implements  IMessage {
    public date: string;
    public fromUsername: IMessageUser;
    public message: string;

    constructor(date: string, id: bigint, name: string, surname: string, message: string) {
        this.date = date;
        this.fromUsername = new MessageUser(id, name, surname);
        this.message = message;
    }
}
