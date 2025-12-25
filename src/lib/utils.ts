import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 커스텀 CSS 클래스용 cn 함수 (twMerge 없이)
export function cnCustom(...inputs: ClassValue[]) {
  return clsx(inputs);
}
