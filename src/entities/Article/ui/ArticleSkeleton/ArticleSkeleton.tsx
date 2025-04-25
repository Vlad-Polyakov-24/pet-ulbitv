import { memo } from 'react';
import { Skeleton } from '@shared/ui/Skeleton';

const ArticleSkeleton = memo(() => (
	<>
		<Skeleton styles={{ borderRadius: '50%', width: 150, height: 150 }} className={'m-centred'} />
		<Skeleton styles={{ width: 300, height: 32 }} className={'mt-15'} />
		<Skeleton styles={{ width: 600, height: 24 }} className={'mt-10'} />
		<Skeleton styles={{ height: 200 }} className={'mt-15'} />
		<Skeleton styles={{ height: 200 }} className={'mt-10'} />
	</>
));

export { ArticleSkeleton };