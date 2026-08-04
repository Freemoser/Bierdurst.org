/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PREVIEW_QUEUE?: string;
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  readonly PUBLIC_CMP_SCRIPT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
