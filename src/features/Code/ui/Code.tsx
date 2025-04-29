import { memo, useCallback } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon } from '@shared/ui/Icon';
import cls from './Code.module.scss';
import CopyIcon from '@shared/assets/icons/copy.svg';

type CodeProps = {
	className?: string;
	text: string;
};

const Code = memo(({ className, text }: CodeProps) => {

	const handleCopy = useCallback(() => {
		void navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<pre className={classNames(cls.code, {}, [className])}>
		<Button onClick={handleCopy} className={cls.code__btn} theme={ButtonTheme.OUTLINE} size={ButtonSize.CUSTOM}>
			<Icon icon={<CopyIcon />} />
		</Button>
		<code className={cls.code__inner}>{text}</code>
	</pre>
	);
});

export default Code;