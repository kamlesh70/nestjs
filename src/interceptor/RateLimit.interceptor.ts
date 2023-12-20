import { CallHandler, ExecutionContext, NestInterceptor, ServiceUnavailableException } from "@nestjs/common";
import { Observable, catchError, map, tap, throwError } from "rxjs";

class RateLimitInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            tap(item => console.log(item)),
            catchError(err => throwError(() => new ServiceUnavailableException())),
        )
    }

}