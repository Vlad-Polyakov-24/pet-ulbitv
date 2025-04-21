import { memo, type CSSProperties, type ReactElement } from 'react';
import { DefaultLoader } from '../DefaultLoader/DefaultLoader';
import { OverlayLoader } from '../OverlayLoader/OverlayLoader';
import { PageLoader } from '../PageLoader/PageLoader';
import { LoaderTheme } from '../../model/types/Loader.types';

type LoaderProps = {
	className?: string;
	theme?: LoaderTheme;
	styles?: CSSProperties;
};

const Loader = memo((props: LoaderProps) => {
	const { className, theme = LoaderTheme.DEFAULT, styles } = props;

	const loaderMap: Record<LoaderTheme, () => ReactElement> = {
		[LoaderTheme.DEFAULT]: () => <DefaultLoader className={className} styles={styles} />,
		[LoaderTheme.OVERLAY]: () => <OverlayLoader className={className} styles={styles} />,
		[LoaderTheme.PAGE]: () => <PageLoader className={className} styles={styles} />,
	};

	return loaderMap[theme]();
});

export default Loader;