/* eslint-disable no-param-reassign */

// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
const adapter = new PrismaNeon(neon);

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // TODO: maybe should limit query logging to non production evironments only
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

// https://www.prisma.io/docs/orm/prisma-client/client-extensions/middleware/logging-middleware
// prisma.$use(async (params, next) => {
//   const before = Date.now();

//   const result = await next(params);

//   const after = Date.now();

//   // eslint-disable-next-line no-console
//   console.log(
//     `Query ${params.model}.${params.action} took ${after - before}ms`,
//   );

//   return result;
// });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
