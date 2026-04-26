import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'Dashboard Template' },
			{
				name: 'description',
				content: 'Starter dashboard app for a pnpm + TanStack Start + Convex workspace.',
			},
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body style={{ margin: 0 }}>
				<Outlet />
				<Scripts />
			</body>
		</html>
	)
}
