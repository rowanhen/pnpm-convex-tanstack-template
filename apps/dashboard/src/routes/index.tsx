import { createFileRoute } from '@tanstack/react-router'
import { AppShell, appCopy } from '@template/shared'

export const Route = createFileRoute('/')({
	component: DashboardHomePage,
})

function DashboardHomePage() {
	const copy = appCopy('Dashboard', 'internal')

	return (
		<AppShell title={copy.title} description={copy.description} accent="#38bdf8">
			<div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
				<Card title="Auth Ready" body="Wire your provider of choice into Convex and expose session state here." />
				<Card
					title="Queries"
					body="Hook Convex queries and mutations into this app without reworking the workspace."
				/>
				<Card
					title="Deploy"
					body="Use the shared root scripts for local dev, env sync, Cloudflare Pages deploys, and CI."
				/>
			</div>
		</AppShell>
	)
}

function Card(props: { title: string; body: string }) {
	return (
		<div
			style={{
				border: '1px solid rgba(255,255,255,0.16)',
				padding: 20,
				background: 'rgba(15, 23, 42, 0.6)',
			}}
		>
			<h2 style={{ marginTop: 0, fontSize: 18 }}>{props.title}</h2>
			<p style={{ marginBottom: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{props.body}</p>
		</div>
	)
}
