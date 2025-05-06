import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		output: {
			mode: 'tags-split', // or 'single'
			target: 'src/lib/api/generated/',
			client: 'react-query', // THIS is for TanStack Query v4/v5
			httpClient: 'axios',
			prettier: true,
			override: {
				mutator: {
					path: 'src/lib/api/mutator/axios/custom-axios.ts',
					name: 'customAxiosRequest'
				}
			}
		},
		input: {
			target: 'src/lib/api/open-api/swagger.json' // your OpenAPI file
		}
	}
});
