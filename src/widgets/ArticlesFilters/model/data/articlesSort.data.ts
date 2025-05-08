import type { TFunction } from 'i18next';
import type { ISelectOptions } from '@shared/ui/Select';

interface GenerateSortOptionsProps<T extends string> {
	t: TFunction;
	options: T[];
}

export const generateSortOptions = <T extends string>({ options, t }: GenerateSortOptionsProps<T>): ISelectOptions<T>[] =>
	options.map((option) => ({
		value: option,
		label: t(option),
	}));