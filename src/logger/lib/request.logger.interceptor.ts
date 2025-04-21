import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { requestLogger } from "./common.logger";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const start = Date.now(); // 请求开始时间
        const host = context.switchToHttp();
        const request = host.getRequest<Request>();
        const urlInfo = `${request.method} ${request.url}`;
        return next.handle().pipe(
            tap(data => {
                const logger = requestLogger;
                logger.info(`|-------------------------------------`);
                logger.info(`|- ${urlInfo} (${Date.now() - start}ms)`);
                logger.info(`|- [USER] ${JSON.stringify((request as any)["user"] ?? {})}`);
                if (request.method == "POST") {
                    logger.info(`|- [BODY] ${JSON.stringify(request.body)}`);
                }
                const respStr = JSON.stringify(data);
                if (respStr.length > 1024) {
                    logger.info(`|- [RESP] ${respStr.substring(0, 1024)}...`);
                } else {
                    logger.info(`|- [RESP] ${respStr}`);
                }
            }),
        );
    }
}
