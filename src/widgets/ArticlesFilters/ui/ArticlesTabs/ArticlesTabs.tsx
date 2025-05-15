import { memo, useCallback } from 'react';
import { Card, CardBackground, CardPadding, CardRadius, CardTheme } from '@shared/ui/Card';
import { HStack } from '@shared/ui/Stack';
import { ArticleType } from '@entities/Article';
import type { IArticlesTab } from '../../model/types/ArticlesTabs.types';
import cls from './ArticlesTabs.module.scss';

type ArticlesTabsProps = {
	className?: string;
	tabs: IArticlesTab[];
	currentTypes: ArticleType[];
	onTabClick: (newTypes: ArticleType[]) => void;
};

const ArticlesTabs = memo((props: ArticlesTabsProps) => {
	const { className, tabs, currentTypes, onTabClick } = props;
	const isAllSelected = currentTypes.includes(ArticleType.ALL);
	const allOtherTabValues = tabs
		.map(tab => tab.value)
		.filter(value => value !== ArticleType.ALL);
	const areAllOtherTabsSelected = allOtherTabValues.every(type => currentTypes.includes(type));

	const handleTabClick = useCallback((tab: IArticlesTab) => () => {
		let newValues: ArticleType[] = [];

		if (tab.value === ArticleType.ALL) {
			newValues = [ArticleType.ALL];
		} else {
			const filtered = currentTypes.filter((v) => v !== ArticleType.ALL);

			if (currentTypes.includes(tab.value)) {
				newValues = filtered.filter((v) => v !== tab.value);
			} else {
				newValues = [...filtered, tab.value];
			}
		}

		const selectedCount = allOtherTabValues.filter(type => newValues.includes(type)).length;

		if (selectedCount === allOtherTabValues.length) {
			newValues = [ArticleType.ALL];
		}

		if (newValues.length === 0) {
			newValues = [ArticleType.ALL];
		}

		onTabClick(newValues);
	}, [allOtherTabValues, onTabClick, currentTypes]);

	const handleTheme = (tabValue: ArticleType): CardTheme => {
		if (tabValue === ArticleType.ALL) {
			if (isAllSelected && currentTypes.length === 1) return CardTheme.DEFAULT;
			if (!isAllSelected && areAllOtherTabsSelected) return CardTheme.DEFAULT;
			return CardTheme.OUTLINE;
		}

		if (isAllSelected && currentTypes.length === 1) return CardTheme.OUTLINE;

		return currentTypes.includes(tabValue) ? CardTheme.DEFAULT : CardTheme.OUTLINE;
	};

	return (
		<HStack as={'ul'} gap={'8'} className={className}>
			{tabs.map((tab) => (
				<Card
					key={tab.value}
					as={'li'}
					onClick={handleTabClick(tab)}
					visual={{
						theme: handleTheme(tab.value),
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

export { ArticlesTabs };