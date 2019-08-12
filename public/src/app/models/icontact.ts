import {IUser} from "./iuser";

export interface IContact {
    id: bigint;
    username: string;
    contact: IUser;
}
