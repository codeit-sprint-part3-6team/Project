import { ReactNode } from 'react';

type ChipType = 'tag' | 'status' | 'status-option';

export interface ChipProps {
  children: ReactNode;
  chipType: ChipType;
}

export const bgTag = ['orange', 'green', 'pink', 'blue'];
