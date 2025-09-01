import { Request } from "express";

export type AuthUserType = {
    email: string;
    role: string;
    refreshToken?: string;
}