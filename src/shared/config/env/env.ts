export const ENV = {
	MODE: import.meta.env.MODE,
	IS_DEV: import.meta.env.DEV,
	IS_PROD: import.meta.env.PROD,
} as const;