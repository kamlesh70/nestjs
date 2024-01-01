import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthUserType } from "src/auth/types/AuthUserType";

export const User = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user: AuthUserType = {
            email: req?.user?.email,
            role: req?.user?.role,
            refreshToken: req?.user?.refreshToken
        }
        return user;
    }
)