import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL ?? '')
	const convexQueryClient = new ConvexQueryClient(convexClient)
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
				gcTime: 5_000,
			},
		},
	})

	convexQueryClient.connect(queryClient)

	return routerWithQueryClient(
		createRouter({
			routeTree,
			context: { queryClient },
			defaultPreload: 'intent',
			scrollRestoration: true,
			Wrap: ({ children }) => <ConvexProvider client={convexClient}>{children}</ConvexProvider>,
		}),
		queryClient,
	)
}
