import { Users } from "./users.model";
export interface Auth{
  token:string;
  refresh_token:string;
  message:string;
  user:Users
}
