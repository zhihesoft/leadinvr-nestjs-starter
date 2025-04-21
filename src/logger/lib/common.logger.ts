/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ConsoleLogger, LogLevel } from "@nestjs/common";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.align(),
    format.printf(i => `${i.timestamp} [${i.level}] ${i.message}`),
);

const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "100m",
    maxFiles: "3w",
};

export function createWinstonLogger(name: string, errorName?: string) {
    const trans = [new transports.DailyRotateFile({ filename: `./logs/${name}-%DATE%.log`, ...defaultOptions })];
    if (errorName) {
        trans.push(
            new transports.DailyRotateFile({
                filename: `./logs/${errorName}-%DATE%.log`,
                level: "error",
                ...defaultOptions,
            }),
        );
    }

    return createLogger({
        level: "info",
        format: customFormat,
        transports: trans,
    });
}

const wlog = createWinstonLogger("trace");

export const requestLogger = createWinstonLogger("req", "req-error");

export class WinstonLogger extends ConsoleLogger {
    protected printMessages(messages: unknown[], context?: string, logLevel?: LogLevel): void {
        super.printMessages(messages, context, logLevel);
        messages.forEach(message => {
            switch (logLevel) {
                case "debug":
                    wlog.debug(`[${context}] ${message}`);
                    break;
                case "verbose":
                    wlog.verbose(`[${context}] ${message}`);
                    break;
                case "log":
                    wlog.info(`[${context}] ${message}`);
                    break;
                case "warn":
                    wlog.warn(`[${context}] ${message}`);
                    break;
                case "error":
                case "fatal":
                    if (message instanceof Error) {
                        wlog.error(`[${context}] ${message.stack}`);
                    } else {
                        wlog.error(`[${context}] ${message}`);
                    }
                    break;
                default:
                    wlog.log(String(logLevel), `[${context}] ${message}`);
                    break;
            }
        });
    }
}
