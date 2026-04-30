export const PROJECT_NAME = 'pnpm-convex-tanstack-template'

export function appTitle(section: string) {
	return `${section} | ${PROJECT_NAME}`
}

export function appMetaDescription(audience: string) {
	return `${PROJECT_NAME} ${audience} app powered by TanStack Start, Convex, pnpm, and dotenvx.`
}
