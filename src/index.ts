import "reflect-metadata";

/** common module */
export { CommonModule } from "./common//common.module";
export { CryptoService } from "./common//crypto/crypto.service";
export { CommonError } from "./common//lib/common.error";
export { Failed, FailedCallback } from "./common//lib/failed";
export { FileNameEncodePipe, FileNamesEncodePipe } from "./common//lib/filename.encode.pipe";
export { getPackageVersion } from "./common//lib/package.info";
export * from "./common//lib/util";

/** jwt guard module */
export { JwtGuardModule } from "./jwt.guard/jwt.guard.module";
export { Public } from "./jwt.guard/lib/public.decorator";
export { JWTSignService } from "./jwt.guard/service/jwt.sign.service";

export { startup } from "./starter/starter";

