import { lazy } from 'react';

const LoginFormAsync = lazy(async () => import('./LoginForm'));

export { LoginFormAsync as LoginForm };