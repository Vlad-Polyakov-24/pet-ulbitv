import { lazy } from 'react';

const AboutPageAsync = lazy(async () => import('./AboutPage'));

export { AboutPageAsync as AboutPage };