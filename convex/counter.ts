import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { label: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.label) {
      const counter = await ctx.db
        .query("counters")
        .withIndex("by_label", (q) => q.eq("label", args.label!))
        .first();
      return counter?.value ?? 0;
    }
    const counters = await ctx.db.query("counters").collect();
    return counters.reduce((sum, counter) => sum + counter.value, 0);
  },
});

export const increment = mutation({
  args: { label: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const label = args.label ?? "default";

    const existing = await ctx.db
      .query("counters")
      .withIndex("by_label", (q) => q.eq("label", label))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: existing.value + 1 });
      return existing.value + 1;
    } else {
      const newCounterId = await ctx.db.insert("counters", {
        value: 1,
        label,
      });
      return 1;
    }
  },
});

export const reset = mutation({
  args: { label: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const label = args.label ?? "default";

    const existing = await ctx.db
      .query("counters")
      .withIndex("by_label", (q) => q.eq("label", label))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: 0 });
    }
    return 0;
  },
});