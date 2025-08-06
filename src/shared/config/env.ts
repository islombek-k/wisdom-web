interface EnvConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
  IS_DEV: boolean;
  IS_PROD: boolean;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
};

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Wisdom Dictionary'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;