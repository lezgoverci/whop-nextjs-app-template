import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    text: v.string(),
    experienceId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      experienceId: args.experienceId,
      userId: args.userId,
      createdAt: Date.now(),
      completedAt: undefined,
    });
    return todoId;
  },
});

export const list = query({
  args: {
    experienceId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_experience_user", q =>
        q.eq("experienceId", args.experienceId).eq("userId", args.userId)
      )
      .order("desc")
      .collect();
    return todos;
  },
});

export const toggleComplete = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await ctx.db.patch(args.id, {
      completed: !todo.completed,
      completedAt: !todo.completed ? Date.now() : undefined,
    });

    return await ctx.db.get(args.id);
  },
});

export const remove = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await ctx.db.delete(args.id);
    return todo;
  },
});

export const update = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await ctx.db.patch(args.id, {
      text: args.text,
    });

    return await ctx.db.get(args.id);
  },
});