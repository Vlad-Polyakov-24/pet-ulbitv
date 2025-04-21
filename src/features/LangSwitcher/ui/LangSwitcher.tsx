import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { locales } from '@shared/config/i18n/i18n.types';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
	className?: string;
}

const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = async () => {
		await i18n.changeLanguage(i18n.language === locales.EN ? locales.UA : locales.EN);
	};

	return (
		<Button
			className={classNames(cls.btn, {}, [className])}
			theme={ButtonTheme.CLEAR}
			size={ButtonSize.CUSTOM}
			onClick={toggle}
		>
			{t('flag')}
		</Button>
	);
});

export default LangSwitcher;
