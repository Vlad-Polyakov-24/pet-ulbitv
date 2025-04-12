import { lazy } from 'react';

const MainPageAsync = lazy(async () => import('./MainPage'));

export { MainPageAsync as MainPage };