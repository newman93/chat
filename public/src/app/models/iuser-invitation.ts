import {IUser} from "./iuser";

export interface IUserInvitation {
    id: bigint;
    username: IUser;
    contact: IUser;
}
