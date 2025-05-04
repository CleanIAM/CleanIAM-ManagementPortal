import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		output: {
			mode: 'tags-split', // or 'single'
			target: 'src/lib/api/generated/',
			client: 'react-query', // THIS is for TanStack Query v4/v5
			httpClient: 'fetch',
			prettier: true,
			override: {
				mutator: {
					path: 'src/lib/api/custom-fetch.ts',
					name: 'customFetch'
				}
			}
		},
		input: {
			target: 'https://localhost:5000/swagger/v1/swagger.json' // your OpenAPI file
		}
	}
});
