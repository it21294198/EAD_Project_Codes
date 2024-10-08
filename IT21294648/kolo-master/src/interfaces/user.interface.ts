import { IBaseEntity } from "@/constants/common.constants";
import { USER_ROLES, WEB_USER_ROLES } from "@/constants/user.constants";

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: number;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: WEB_USER_ROLES;
}
