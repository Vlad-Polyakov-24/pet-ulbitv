import type { FlexAlign, FlexDirection, FlexGap, FlexJustify } from '../model/types/Stack.types';
import cls from '../ui/Flex/Flex.module.scss';

export const justifyClasses: Record<FlexJustify, string> = {
	start: cls.justifyStart,
	center: cls.justifyCenter,
	end: cls.justifyEnd,
	between: cls.justifyBetween,
	around: cls.justifyAround,
	stretch: cls.justifyStretch,
};

export const alignClasses: Record<FlexAlign, string> = {
	start: cls.alignStart,
	center: cls.alignCenter,
	end: cls.alignEnd,
	stretch: cls.alignStretch,
};

export const directionClasses: Record<FlexDirection, string> = {
	row: cls.directionRow,
	column: cls.directionColumn,
};

export const gapClasses: Record<FlexGap, string> = {
	2: cls.gap2,
	4: cls.gap4,
	6: cls.gap6,
	8: cls.gap8,
	10: cls.gap10,
	12: cls.gap12,
	14: cls.gap14,
	16: cls.gap16,
	18: cls.gap18,
	20: cls.gap20,
	24: cls.gap24,
	28: cls.gap28,
	32: cls.gap32,
	36: cls.gap36,
	40: cls.gap40,
};