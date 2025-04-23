import { memo, useCallback } from 'react';
import { Select } from '@shared/ui/Select';
import { countrySelectOptions } from '../../model/data/countrySelect.data.ts';
import { Country } from '../../model/types/Country.types';

type CurrencySelectProps = {
	className?: string;
	label?: string;
	value?: Country;
	onChange?: (value: Country) => void;
	disabled?: boolean;
	error?: string;
};

const CountrySelect = memo((props: CurrencySelectProps) => {
	const { onChange, ...rest } = props;

	const handleChange = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange],
	);

	return (
		<Select
			options={countrySelectOptions}
			onChange={handleChange}
			{...rest}
		/>
	);
});

export default CountrySelect;