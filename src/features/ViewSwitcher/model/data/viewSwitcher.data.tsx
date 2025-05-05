import { ArticleView } from '@entities/Article';
import GridIcon from '@shared/assets/icons/tiled.svg';
import SingleIcon from '@shared/assets/icons/list.svg';

export const views = [
	{
		view: ArticleView.GRID,
		icon: <GridIcon />,
	},
	{
		view: ArticleView.SINGLE,
		icon: <SingleIcon />,
	},
];