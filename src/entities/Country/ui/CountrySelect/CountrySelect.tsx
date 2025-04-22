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
};

const CountrySelect = memo((props: CurrencySelectProps) => {
	const { className, label, value, onChange, disabled } = props;

	const handleChange = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange],
	);

	return (
		<Select
			className={className}
			options={countrySelectOptions}
			label={label}
			value={value}
			onChange={handleChange}
			disabled={disabled}
		/>
	);
});

export default CountrySelect;