import { createInterface } from 'node:readline/promises'
import { readFile, writeFile } from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process'

const rawName = process.argv[2] ?? (await promptForName())
const projectName = normalizeProjectName(rawName)

if (!projectName) {
	console.error('Project name is required.')
	process.exit(1)
}

const packageJsonPath = new URL('../package.json', import.meta.url)
const readmePath = new URL('../README.md', import.meta.url)
const projectConfigPath = new URL('../packages/shared/src/project.ts', import.meta.url)

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
packageJson.name = projectName
await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, '\t')}\n`)

const readme = await readFile(readmePath, 'utf8')
await writeFile(readmePath, readme.replace(/^# .+$/m, `# ${projectName}`))

const projectConfig = await readFile(projectConfigPath, 'utf8')
await writeFile(
	projectConfigPath,
	projectConfig.replace(/PROJECT_NAME = '.*'/, `PROJECT_NAME = '${projectName}'`),
)

console.log(`Initialized project as "${projectName}".`)
console.log('Next steps:')
console.log('1. pnpm install')
console.log('2. Fill in .env.local, .env.convex, .env.prod, and .env.keys')
console.log('3. pnpm dev')

async function promptForName() {
	const rl = createInterface({ input, output })
	try {
		return await rl.question('Project name: ')
	} finally {
		rl.close()
	}
}

function normalizeProjectName(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[_\s]+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}
