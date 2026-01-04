import { v } from "convex/values";
import { mutation } from './_generated/server'

export const create = mutation({
    args: {
        date: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;

        const calendar = await ctx.db.insert("calendarDates", {
            userId,
            date: args.date,
        });

        return calendar;
    }
})

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