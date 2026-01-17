/**
 * Database Schemas Index
 * Central export point for all schemas and relations
 */

// Auth schemas
export * from "./auth";

// User schemas
export * from "./user";

// Health tracking schemas (includes createTable)
export { dailyLog, streakState, createTable } from "./health";

// Legacy schemas (to be removed)
export { posts } from "./legacy";

// Relations
export * from "./relations";
