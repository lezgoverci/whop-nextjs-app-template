import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  counters: defineTable({
    value: v.number(),
    label: v.optional(v.string()),
  }).index("by_label", ["label"]),
  users: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    experienceId: v.string(),
    userId: v.string(),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_experience_user", ["experienceId", "userId"]),
});