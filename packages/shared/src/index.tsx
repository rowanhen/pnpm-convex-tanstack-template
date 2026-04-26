import type { ReactNode } from 'react'

export function appCopy(name: string, audience: string) {
	return {
		title: `${name} template`,
		description: `Starter ${audience} app powered by TanStack Start, Convex, pnpm, and dotenvx.`,
	}
}

export function AppShell(props: {
	title: string
	description: string
	accent: string
	children: ReactNode
}) {
	const { title, description, accent, children } = props

	return (
		<div
			style={{
				minHeight: '100vh',
				background:
					'radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 30%), #0f172a',
				color: '#e2e8f0',
				fontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
			}}
		>
			<div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 80px' }}>
				<div
					style={{
						display: 'inline-block',
						padding: '6px 10px',
						border: `1px solid ${accent}`,
						color: accent,
						fontSize: 12,
						letterSpacing: '0.08em',
						textTransform: 'uppercase',
						marginBottom: 24,
					}}
				>
					pnpm project template
				</div>
				<h1 style={{ fontSize: 48, lineHeight: 1.05, margin: 0 }}>{title}</h1>
				<p style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.7, color: '#cbd5e1' }}>
					{description}
				</p>
				{children}
			</div>
		</div>
	)
}
