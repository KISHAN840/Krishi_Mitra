/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_MARKET_API_KEY: string;
  readonly VITE_HF_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
