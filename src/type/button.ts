import { ButtonHTMLAttributes, ReactNode } from 'react';

// BadgeColor: 배지 색상 타입.
// 허용되는 색상: 'green', 'purple', 'orange', 'blue', 'pink'
export type BadgeColor = 'green' | 'purple' | 'orange' | 'blue' | 'pink';

// 버튼의 타입과 관련된 클래스 리스트.
export const types = {
  normal: {
    classes: ['normal', 'border'],
  },
  normal_colored: {
    classes: ['normal', 'colored'],
  },
  delete: {
    classes: ['delete', 'border'],
  },
  cancel: {
    classes: ['cancle', 'border'],
  },
  edit: {
    classes: ['edit', 'border'],
  },
  modal: {
    classes: ['modal', 'border'],
  },
  modal_colored: {
    classes: ['modal', 'colored'],
  },
  modal_single: {
    classes: ['modal', 'single', 'colored'],
  },
  auth: {
    classes: ['auth', 'colored'],
  },
  column: {
    classes: ['column', 'border'],
  },
  todo: {
    classes: ['todo', 'border'],
  },
  dashboard_add: {
    classes: ['dashboard', 'add', 'border'],
  },
  dashboard_delete: {
    classes: ['dashboard', 'delete', 'border'],
  },
  dashboard_card: {
    classes: ['dashboard', 'card', 'border'],
  },
  pagination_prev: {
    classes: ['pagination', 'prev', 'border'],
  },
  pagination_next: {
    classes: ['pagination', 'next', 'border'],
  },
  profile_save: {
    classes: ['profile', 'save', 'colored'],
  },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classes: string[];
}

export interface CDSButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: keyof typeof types;
  badge?: BadgeColor;
  owner?: boolean;
}
