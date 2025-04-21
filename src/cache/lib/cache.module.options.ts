export class CacheModuleOptions {
    /**
     * Global cache module
     * Default: true
     */
    global?: boolean;
    /**
     * Redis URI
     */
    redisUri: string = "";

    /**
     * Redis workspace
     */
    workspace: string = "default";
}
