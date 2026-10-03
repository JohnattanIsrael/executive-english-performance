import type { Services } from "./contracts";
import { mockServices } from "./mock";

export type * from "./contracts";

/**
 * Service registry — the single switch between sample data and real backends.
 *
 * To connect a backend, add `src/lib/services/api/index.ts` exporting an
 * object that implements `Services` (it can reuse individual mock services
 * while others go live), then select it here when
 * NEXT_PUBLIC_DATA_SOURCE === "api".
 */
export const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE || "mock";

export const services: Services = mockServices;

export const isDemoData = dataSource === "mock";
