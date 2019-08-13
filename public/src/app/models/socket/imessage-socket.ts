export interface IMessageSocket {
    type: string;
    fromUsername: bigint;
    fromName: string;
    fromSurname: string;
    toUsername: bigint;
    message: string;
    dateTime: string;
}

export const MESSAGE = 'message';

export class MessageSocket implements  IMessageSocket {
    type: string;
    fromUsername: bigint;
    fromName: string;
    fromSurname: string;
    toUsername: bigint;
    message: string;
    dateTime: string;

    constructor(fromUsername: bigint, fromName: string, fromSurname: string,
                toUsername: bigint, message: string, dateTime: string) {
        this.type = MESSAGE;
        this.fromUsername = fromUsername;
        this.fromName = fromName;
        this.fromSurname = fromSurname;
        this.toUsername = toUsername;
        this.message = message;
        this.dateTime = dateTime;
    }
}
