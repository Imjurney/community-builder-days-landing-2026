---
inclusion: always
---

# 컴포넌트 작성 규칙

## Shadcn UI 스타일 유지

새로운 커스텀 컴포넌트를 만들 때는 **반드시 Shadcn UI 스타일을 유지**해야 합니다.

### 규칙

- Tailwind CSS를 사용하여 스타일링합니다
- `cn()` 유틸리티 함수를 사용하여 클래스를 병합합니다
- `class-variance-authority` (cva)를 사용하여 variant를 정의합니다
- 컴포넌트는 `React.forwardRef`를 사용하여 ref를 전달할 수 있도록 합니다
- 접근성(accessibility)을 고려하여 적절한 ARIA 속성을 추가합니다
- Shadcn UI의 디자인 토큰과 색상 시스템을 따릅니다

### 디자인 일관성

- **색상**: Shadcn UI의 CSS 변수 시스템을 사용합니다 (`hsl(var(--primary))`, `hsl(var(--secondary))` 등)
- **간격**: Tailwind의 spacing scale을 따릅니다 (p-4, gap-2, space-y-4 등)
- **비율**: 적절한 aspect ratio와 padding을 유지합니다
- **타이포그래피**: Shadcn UI의 텍스트 스타일을 따릅니다 (text-sm, font-medium 등)
- **둥근 모서리**: 일관된 border-radius를 사용합니다 (rounded-md, rounded-lg 등)
- **그림자**: Shadcn UI의 shadow 시스템을 따릅니다 (shadow-sm, shadow-md 등)
- **애니메이션**: 부드러운 transition을 적용합니다 (transition-colors, duration-200 등)

### 예시 구조

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        // ...
      },
      size: {
        default: "default-size-classes",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```
