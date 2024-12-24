import { ReactNode } from 'react';

type ChipType = 'tag' | 'status' | 'status-option';

export interface ChipProps {
  children: ReactNode;
  chipType: ChipType;
  color?: BgTagColor;
}

export const bgTag = ['orange', 'green', 'pink', 'blue'];

export type BgTagColor = (typeof bgTag)[number];
