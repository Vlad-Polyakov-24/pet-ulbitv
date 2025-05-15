import Flex, { type FlexProps } from '../Flex/Flex';
import type { ElementType } from 'react';

type VStackProps<T extends ElementType = 'div'> = FlexProps<T>;

const VStack = <T extends ElementType = 'div'>(props: VStackProps<T>) => (
	<Flex {...props} direction={'column'} />
);

export default VStack;