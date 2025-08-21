interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_BASE_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Allow importing CSS modules
declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.sass';
