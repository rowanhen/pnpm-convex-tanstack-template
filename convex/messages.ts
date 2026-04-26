import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('messages').order('desc').take(20)
	},
})

export const create = mutation({
	args: {
		body: v.string(),
		source: v.union(v.literal('marketing'), v.literal('dashboard')),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('messages', {
			...args,
			createdAt: Date.now(),
		})
	},
})
