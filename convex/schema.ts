import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id("documents")),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean()
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

    calendarDates: defineTable({
        userId: v.string(),
        date: v.string(),
        content: v.optional(v.string()),
        mood: v.optional(v.string()),
        song: v.optional(
            v.object({
                name: v.string(),
                artist: v.string(),
                coverUrl: v.string(),
                durationMs: v.number(),
            })
        ),       
    })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),
})