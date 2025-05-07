import { StoreProviderSchema } from '@app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScrollRestorationScroll = (state: StoreProviderSchema) => state.scrollRestoration.scroll;
export const getScrollRestorationScrollByPath = createSelector(
	getScrollRestorationScroll,
	(_: StoreProviderSchema, path: string) => path,
	(scroll, path) => scroll[path] || 0,
);