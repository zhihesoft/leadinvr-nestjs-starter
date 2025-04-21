import { CommonError } from "./common.error";

export type FailedCallback = () => string | Error;

export class Failed {
    static on(condition: unknown, callback: FailedCallback | string) {
        if (!condition) {
            return;
        }

        let resp: string | Error;
        if (typeof callback === "string") {
            resp = callback;
        } else {
            resp = callback();
        }

        if (typeof resp === "string") {
            throw CommonError.of(-1, resp);
        } else {
            throw resp;
        }
    }

    static onFalsy(condition: unknown, callback: FailedCallback | string): asserts condition {
        Failed.on(!condition, callback);
    }

    static fire(code: number | string | Error, message?: string): never {
        if (typeof code === "number") {
            Failed.on(true, () => CommonError.of(code, message));
        } else if (typeof code === "string") {
            Failed.on(true, () => CommonError.of(-1, code));
        } else {
            Failed.on(true, () => code);
        }
        throw new Error("Unreachable code");
    }
}
