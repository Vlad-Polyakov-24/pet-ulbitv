import { lazy } from 'react';

const AddCommentFormAsync = lazy(async () => import('./AddCommentForm'));

export { AddCommentFormAsync as AddCommentForm };