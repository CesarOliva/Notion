import { v } from "convex/values";
import { mutation, query } from './_generated/server'

export const getOrCreate = mutation({
    args: {
        date: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const existing = await ctx.db.query("calendarDates")
            .withIndex("by_user_date", q =>
                q.eq("userId", userId).eq("date", args.date)
            )
            .first();

        if (existing) {
            return existing;
        }

        const insert = await ctx.db.insert("calendarDates", {
            userId,
            date: args.date,
        });

        return insert;
    },
});

export const update = mutation({
    args: {
        date: v.string(), //as Id
        content: v.optional(v.string()),
        mood: v.optional(v.string()),
        song: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const existingDate = await ctx.db.query('calendarDates')
            .withIndex("by_user_date", q =>
                q.eq("userId", userId).eq("date", args.date)
            )
            .first();

        if(!existingDate){
            throw new Error("Not found");
        }

        if(existingDate.userId !== userId){
            throw new Error("Unauthorized")
        }

        const date = await ctx.db.patch(existingDate._id, {
            ...args,
        })

        return date;
    }
})

export const getByDate = query({
    args: {
        date: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const date = await ctx.db.query("calendarDates")
            .withIndex("by_user_date", q =>
                q.eq("userId", userId).eq("date", args.date)
            )
            .first();

        return date;
    }
})

export const removeMood = mutation({
    args: {
        date: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const existingDate = await ctx.db.query('calendarDates')
            .withIndex("by_user_date", q =>
                q.eq("userId", userId).eq("date", args.date)
            )
            .first();

        if(!existingDate){
            throw new Error("Not found");
        }

        if(existingDate.userId !== userId){
            throw new Error("Unauthorized")
        }

        const date = await ctx.db.patch(existingDate._id, {
            mood: undefined,
        })

        return date;
    }
})