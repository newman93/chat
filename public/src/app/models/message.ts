import {MessageUser} from "./message-user";

export interface Message {
    date: string;
    from_username: MessageUser;
    message: string;
}
