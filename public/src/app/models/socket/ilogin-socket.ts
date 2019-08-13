export interface ILoginSocket {
    type: string;
    fromUsername: string;
}

export const LOGIN = 'login';

export class LoginSocket implements ILoginSocket {
    type: string;
    fromUsername: string;

    constructor(fromUsername: string) {
        this.type = LOGIN;
        this.fromUsername = fromUsername;
    }
}
