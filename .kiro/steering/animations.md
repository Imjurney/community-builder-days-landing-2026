---
inclusion: always
---

# 애니메이션 가이드 (GSAP)

## 개요

프로젝트에서는 GSAP(GreenSock Animation Platform)을 사용하여 애니메이션을 구현합니다. 재사용 가능한 Hook 형태로 제공되어 일관된 애니메이션 경험을 제공합니다.

## 설치된 라이브러리

- `gsap` - 고성능 애니메이션 라이브러리

## 제공되는 Hook

모든 Hook은 `src/lib/gsap.ts`에 정의되어 있습니다.

### 1. useFadeIn

요소가 투명도 0에서 1로 페이드인됩니다.

```tsx
import { useFadeIn } from "@/lib/gsap";

function Component() {
  const ref = useFadeIn<HTMLDivElement>({
    duration: 1,
    delay: 0.2,
  });

  return <div ref={ref}>페이드인 콘텐츠</div>;
}
```

### 2. useSlideUp

요소가 아래에서 위로 슬라이드하며 나타납니다.

```tsx
import { useSlideUp } from "@/lib/gsap";

function Component() {
  const ref = useSlideUp<HTMLDivElement>({
    duration: 0.8,
    distance: 50, // 이동 거리 (px)
  });

  return <div ref={ref}>슬라이드업 콘텐츠</div>;
}
```

### 3. useScaleIn

요소가 작은 크기에서 원래 크기로 확대됩니다.

```tsx
import { useScaleIn } from "@/lib/gsap";

function Component() {
  const ref = useScaleIn<HTMLButtonElement>({
    duration: 0.6,
    from: 0.8, // 시작 크기 (0~1)
    ease: "back.out(1.7)", // 튕기는 효과
  });

  return <button ref={ref}>버튼</button>;
}
```

### 4. useStagger

여러 자식 요소를 순차적으로 애니메이션합니다.

```tsx
import { useStagger } from "@/lib/gsap";

function Component() {
  const ref = useStagger<HTMLDivElement>(".item", {
    duration: 0.6,
    stagger: 0.1, // 각 요소 간 간격 (초)
    from: { opacity: 0, y: 20 },
  });

  return (
    <div ref={ref}>
      <div className="item">아이템 1</div>
      <div className="item">아이템 2</div>
      <div className="item">아이템 3</div>
    </div>
  );
}
```

### 5. useGSAP

커스텀 GSAP 애니메이션을 자유롭게 정의합니다.

```tsx
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";

function Component() {
  const ref = useGSAP<HTMLDivElement>((element, ctx) => {
    const tl = ctx.timeline();

    tl.from(element, { opacity: 0, scale: 0 })
      .to(element, { rotation: 360 })
      .to(element, { x: 100 });
  });

  return <div ref={ref}>커스텀 애니메이션</div>;
}
```

### 6. useScrollTrigger

스크롤 위치에 따라 애니메이션을 실행합니다.

**주의**: ScrollTrigger 플러그인 등록이 필요합니다.

```tsx
import { useScrollTrigger } from "@/lib/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 앱 초기화 시 한 번만 실행
gsap.registerPlugin(ScrollTrigger);

function Component() {
  const ref = useScrollTrigger<HTMLDivElement>({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
    start: "top 80%",
  });

  return <div ref={ref}>스크롤 애니메이션</div>;
}
```

## 공통 옵션

모든 Hook은 다음 옵션을 지원합니다:

```typescript
{
  duration?: number;      // 애니메이션 지속 시간 (초)
  delay?: number;         // 시작 지연 시간 (초)
  ease?: string;          // 이징 함수 (예: "power2.out", "back.out(1.7)")
  onComplete?: () => void; // 완료 시 콜백
}
```

## 사용 원칙

### 1. 단일 책임 원칙

각 Hook은 하나의 애니메이션 타입만 담당합니다. 복잡한 애니메이션은 여러 Hook을 조합하거나 `useGSAP`를 사용하세요.

```tsx
// ✅ 좋은 예: 각 요소에 적절한 Hook 사용
function Hero() {
  const titleRef = useSlideUp<HTMLHeadingElement>();
  const descRef = useFadeIn<HTMLParagraphElement>({ delay: 0.3 });
  const buttonRef = useScaleIn<HTMLDivElement>({ delay: 0.6 });

  return (
    <>
      <h1 ref={titleRef}>제목</h1>
      <p ref={descRef}>설명</p>
      <div ref={buttonRef}>
        <button>버튼</button>
      </div>
    </>
  );
}
```

### 2. 성능 고려

- 애니메이션은 `transform`과 `opacity` 속성을 우선 사용 (GPU 가속)
- 많은 요소를 동시에 애니메이션할 때는 `useStagger` 사용
- 불필요한 리렌더링을 방지하기 위해 옵션을 메모이제이션

```tsx
// ✅ 좋은 예: 옵션 메모이제이션
const options = useMemo(
  () => ({
    duration: 1,
    delay: 0.2,
  }),
  []
);

const ref = useFadeIn<HTMLDivElement>(options);
```

### 3. 접근성 고려

- 애니메이션이 필수 정보를 가리지 않도록 주의
- `prefers-reduced-motion` 미디어 쿼리 고려 (필요시)
- 중요한 콘텐츠는 애니메이션 없이도 접근 가능하도록

## 예시: Hero 섹션

```tsx
import { useSlideUp, useFadeIn, useScaleIn, useStagger } from "@/lib/gsap";

export default function Hero() {
  const titleRef = useSlideUp<HTMLHeadingElement>({
    duration: 1,
    delay: 0.2,
  });

  const descRef = useFadeIn<HTMLParagraphElement>({
    duration: 0.8,
    delay: 0.5,
  });

  const buttonRef = useScaleIn<HTMLDivElement>({
    duration: 0.6,
    delay: 0.8,
  });

  const cardsRef = useStagger<HTMLDivElement>(".feature-card", {
    duration: 0.6,
    delay: 1,
    stagger: 0.15,
  });

  return (
    <section>
      <h1 ref={titleRef}>Community Builder Days 2025</h1>
      <p ref={descRef}>커뮤니티를 지속 가능하게 만드는 실전 하루</p>
      <div ref={buttonRef}>
        <button>지금 등록하기</button>
      </div>
      <div ref={cardsRef}>
        <div className="feature-card">특징 1</div>
        <div className="feature-card">특징 2</div>
        <div className="feature-card">특징 3</div>
      </div>
    </section>
  );
}
```

## 참고 자료

- GSAP 공식 문서: https://gsap.com/docs/v3/
- Easing 함수 시각화: https://gsap.com/docs/v3/Eases
- 예시 코드: `src/lib/gsap.example.tsx`
