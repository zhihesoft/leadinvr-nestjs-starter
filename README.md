# Starter for NestJS

starter module for nestjs

<p align="center">
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/v/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/dt/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/dm/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@leadinvr/nestjs-starter">
    <img src="https://img.shields.io/npm/l/@leadinvr/nestjs-starter.svg?style=for-the-badge" alt="npm license" />
  </a>
</p>

# Quick Start

## Install

```bash
npm i @leadinvr/nestjs-starter
```

## Usage

### Environment Setup

启动模块需要设置以下变量

```ts
/**
 * StarterOption interface for configuring the NestJS application.
 * It includes options for body parser limit, CORS, and an initialization function.
 */
export class StarterModuleOptions {
    /**
     * The URL for the Redis server.
     */
    redisUrl: string = "";

    /**
     * The time-to-live (TTL) for Redis cache in seconds.
     */
    redisTTL: number = 10; // Default TTL for Redis cache in seconds

    /**
     * The workspace name for Redis, default is "default".
     */
    redisWorkspace: string = "default";

    /**
     * The secret for JWT tokens.
     */
    jwtSecret: string = "jwt-secret";

    /**
     * The issuer for JWT tokens.
     */
    jwtIssuer: string = "jwt-issuer";

    /**
     * The audience for JWT tokens.
     */
    jwtAudience: string = "jwt-audience";
}
```

### Startup

```ts
export async function startup(module: any, opt: StarterOption);
```
