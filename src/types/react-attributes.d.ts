import "react";

declare module "react" {
  // React 18 타입에는 `fetchpriority`(lowercase) DOM attribute가 없어서 보강합니다.
  // React 경고를 피하려고 `fetchPriority`(camelCase) 대신 lowercase를 사용합니다.
  interface ImgHTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto" | (string & {});
  }
}

