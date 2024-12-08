import { Pool } from "@neondatabase/serverless";
import type { User, Gender, MediaType } from "@prisma/client";
import { $Enums, Prisma, PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const connectionString = process.env.POSTGRES_PRISMA_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? [
            {
              emit: "event",
              level: "query",
            },
          ]
        : undefined,
  });

export { $Enums, Prisma };

export type {
  User as DbUserType,
  Gender as DbGenderType,
  MediaType as DbMediaType,
};

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
