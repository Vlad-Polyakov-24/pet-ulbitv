import { memo, useCallback } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Card, CardBackground, CardPadding, CardRadius, CardTheme } from '@shared/ui/Card';
import { HStack } from '@shared/ui/Stack';
import type { ITab } from '../model/types/Tabs.types';
import cls from './Tabs.module.scss';

type TabsProps = {
	className?: string;
	tabs: ITab[];
	value: string;
	onTabClick: (tab: ITab) => void;
};

const Tabs = memo((props: TabsProps) => {
	const { className, tabs, value, onTabClick } = props;

	const handleTabClick = useCallback((tab: ITab) => () => {
		onTabClick(tab);
	}, [onTabClick]);

	return (
		<HStack as={'ul'} gap={'8'} className={classNames(cls.tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					key={tab.value}
					as={'li'}
					onClick={handleTabClick(tab)}
					visual={{
						theme: tab.value === value ? CardTheme.DEFAULT : CardTheme.OUTLINE,
						padding: CardPadding.P_1,
						background: CardBackground.PRIMARY_INVERTED,
						radius: CardRadius.R_10,
					}}
					className={cls.card}
				>
					{tab.content}
				</Card>
			))}
		</HStack>
	);
});

export default Tabs;