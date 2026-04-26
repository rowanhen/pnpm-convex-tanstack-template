import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	messages: defineTable({
		body: v.string(),
		source: v.union(v.literal('marketing'), v.literal('dashboard')),
		createdAt: v.number(),
	}),
})
