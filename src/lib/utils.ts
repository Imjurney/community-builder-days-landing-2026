import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 커스텀 CSS 클래스용 cn 함수 (twMerge 없이)
export function cnCustom(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 타이포그래피 유틸리티 함수
export const typography = {
  // Korean 스타일
  largeTitle1: (className?: string) => cnCustom("text-large-title1", className),
  title1: (className?: string) => cnCustom("text-title1", className),
  title2: (className?: string) => cnCustom("text-title2", className),
  body1: (className?: string) => cnCustom("text-body1", className),

  // English 스타일
  englishTitle3: (className?: string) =>
    cnCustom("text-english-title3", className),

  // Fancy (Pixelify Sans) 스타일
  fancyLargeTitle1: (className?: string) =>
    cnCustom("text-fancy-large-title1", className),
  fancyLargeTitle2: (className?: string) =>
    cnCustom("text-fancy-large-title2", className),
  fancyTitle1: (className?: string) => cnCustom("text-fancy-title1", className),
  fancySubtitle1: (className?: string) =>
    cnCustom("text-fancy-subtitle1", className),
  fancyBody1: (className?: string) => cnCustom("text-fancy-body1", className),
} as const;

// 개별 타이포그래피 함수들 (더 간단한 사용을 위해)
// Korean 스타일
export const textLargeTitle1 = (className?: string) =>
  typography.largeTitle1(className);
export const textTitle1 = (className?: string) => typography.title1(className);
export const textTitle2 = (className?: string) => typography.title2(className);
export const textBody1 = (className?: string) => typography.body1(className);

// English 스타일
export const textEnglishTitle3 = (className?: string) =>
  typography.englishTitle3(className);

// Fancy 스타일
export const textFancyLargeTitle1 = (className?: string) =>
  typography.fancyLargeTitle1(className);
export const textFancyLargeTitle2 = (className?: string) =>
  typography.fancyLargeTitle2(className);
export const textFancyTitle1 = (className?: string) =>
  typography.fancyTitle1(className);
export const textFancySubtitle1 = (className?: string) =>
  typography.fancySubtitle1(className);
export const textFancyBody1 = (className?: string) =>
  typography.fancyBody1(className);
