import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { createHash, createHmac, randomBytes } from "crypto";

@Injectable()
export class CryptoService {
    /**
     * User bcrytp to hash password
     * @param password
     * @returns hashed password
     */
    async bcryptHash(password: string): Promise<string> {
        return await hash(password, 10);
    }

    /**
     * Compare password with hashed password
     * @param password password
     * @param hashedPassword hashed password (store in db)
     * @returns identical return true, otherwise return false
     */
    async bcryptCompare(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }

    /**
     * Generate md5 hash
     * @param str
     * @returns
     */
    md5(str: string): string {
        return createHash("md5").update(str).digest("hex");
    }

    /**
     * Generate sha256 hash
     * @param str
     * @param secret
     * @returns
     */
    hmacSHA256(str: string, secret: string): string {
        return createHmac("sha256", secret).update(str).digest("base64");
    }

    /**
     * Buffer to base64 encode
     * @param buffer Buffer to encode
     * @returns
     */
    base64Encode(buffer: Buffer): string {
        return buffer.toString("base64");
    }

    /**
     * Base64 decode to buffer
     * @param str Base64 string to decode
     * @returns Buffer
     */
    base64Decode(str: string): Buffer {
        return Buffer.from(str, "base64");
    }

    /**
     * Generate a random string of given length
     * @param length Length of the string to generate
     * @returns Random string
     */
    randomString(length: number): string {
        return randomBytes(length / 2)
            .toString("hex")
            .slice(0, length);
    }
}
