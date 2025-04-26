import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "single", // or 'single'
      target: "src/api/generated/",
      client: "react-query", // THIS is for TanStack Query v4/v5
      httpClient: 'fetch',
    },
    input: {
      target: "src/api/open-api/swagger.json", // your OpenAPI file
    },
  },
});
