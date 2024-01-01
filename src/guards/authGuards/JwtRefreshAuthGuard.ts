import { AuthGuard } from "@nestjs/passport";

export default class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh'){}