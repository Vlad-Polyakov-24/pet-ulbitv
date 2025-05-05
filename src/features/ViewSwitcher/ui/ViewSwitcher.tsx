import { memo, useCallback } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { views } from '../model/data/viewSwitcher.data.tsx';
import { ArticleView } from '@entities/Article';
import cls from './ViewSwitcher.module.scss';

type ViewSwitcherProps = {
	className?: string;
	currentView: ArticleView;
	onChange?: (view: ArticleView) => void;
};

const ViewSwitcher = memo((props: ViewSwitcherProps) => {
	const { className, currentView, onChange } = props;

	const handleChange = useCallback(
		(newView: ArticleView) => () => {
			onChange?.(newView);
		},
		[onChange]
	);

	return (
		<div className={classNames(cls.switcher, {}, [className])}>
			{views.map(({ view, icon }) => (
				<Button
					key={view}
					theme={ButtonTheme.CLEAR}
					className={classNames(cls.switcher__btn, {[cls.current]: view === currentView}, [])}
					onClick={handleChange(view)}
				>
					<Icon icon={icon} size={IconSize.SIZE_24} />
				</Button>
			))}
		</div>
	);
});

export default ViewSwitcher;