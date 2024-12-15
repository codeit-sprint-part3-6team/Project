import { Dispatch, SetStateAction } from 'react';

export interface ColorSelectorProps {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  customStyle: string;
}