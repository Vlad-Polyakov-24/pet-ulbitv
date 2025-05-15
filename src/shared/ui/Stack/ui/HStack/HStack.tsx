import type { ElementType } from 'react';
import Flex, { type FlexProps } from '../Flex/Flex';

type HStackProps<T extends ElementType = 'div'> = FlexProps<T>;

const HStack = <T extends ElementType = 'div'>(props: HStackProps<T>) => (
	<Flex {...props} direction={'row'} />
);

export default HStack;