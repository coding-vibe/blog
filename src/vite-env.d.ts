/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_VERIFY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
