import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		output: {
			mode: 'single', // or 'single'
			target: 'src/api/generated/',
			client: 'react-query', // THIS is for TanStack Query v4/v5
			override: {
				mutator: {
					path: 'src/api/custom-fetch.ts',
					name: 'customFetch'
				}
			}
		},
		input: {
			target: 'src/api/open-api/swagger.json' // your OpenAPI file
		}
	}
});
