export interface IMessageUser {
    id: bigint;
    name: string;
    surname: string;
}

export class MessageUser implements IMessageUser{
    public id: bigint;
    public name: string;
    public surname: string;

    constructor(id: bigint, name: string, surname: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
}
