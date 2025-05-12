interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Allow importing CSS modules
declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.sass';
