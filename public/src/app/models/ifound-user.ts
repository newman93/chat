import {IUser} from "./iuser";

export interface IFoundUser {
    id: bigint;
    username: string;
    e_mail: string;
    name: string;
    surname: string;
    avatar: string;
    function: number;
    active: number;
    contacts_contact: IUser;
    invitations_contact: IUser;
    invitations_username: IUser;
}
