/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAGES_TOTAL: number;
  readonly VITE_START_PAGE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
