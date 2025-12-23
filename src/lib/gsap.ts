import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

/**
 * GSAP 애니메이션 공통 옵션 타입
 */
export type GSAPAnimationOptions = {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  onComplete?: () => void;
};

/**
 * Hook: 페이드인 애니메이션
 * 요소가 마운트될 때 투명도 0에서 1로 페이드인
 */
export function useFadeIn<T extends HTMLElement>(
  options: GSAPAnimationOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: options.duration ?? 0.6,
        delay: options.delay ?? 0,
        ease: options.ease ?? "power2.out",
        onComplete: options.onComplete,
      }
    );
  }, [options.duration, options.delay, options.ease, options.onComplete]);

  return ref;
}

/**
 * Hook: 슬라이드업 애니메이션
 * 요소가 아래에서 위로 슬라이드하면서 나타남
 */
export function useSlideUp<T extends HTMLElement>(
  options: GSAPAnimationOptions & { distance?: number } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: options.distance ?? 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        delay: options.delay ?? 0,
        ease: options.ease ?? "power3.out",
        onComplete: options.onComplete,
      }
    );
  }, [
    options.duration,
    options.delay,
    options.ease,
    options.distance,
    options.onComplete,
  ]);

  return ref;
}

/**
 * Hook: 스케일 애니메이션
 * 요소가 작은 크기에서 원래 크기로 확대
 */
export function useScaleIn<T extends HTMLElement>(
  options: GSAPAnimationOptions & { from?: number } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: options.from ?? 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 0.6,
        delay: options.delay ?? 0,
        ease: options.ease ?? "back.out(1.7)",
        onComplete: options.onComplete,
      }
    );
  }, [
    options.duration,
    options.delay,
    options.ease,
    options.from,
    options.onComplete,
  ]);

  return ref;
}

/**
 * Hook: 스태거 애니메이션 (여러 자식 요소를 순차적으로 애니메이션)
 * 자식 요소들이 순차적으로 나타남
 */
export function useStagger<T extends HTMLElement>(
  selector: string,
  options: GSAPAnimationOptions & { from?: gsap.TweenVars } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.fromTo(elements, options.from ?? { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.6,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.1,
      ease: options.ease ?? "power2.out",
      onComplete: options.onComplete,
    });
  }, [
    selector,
    options.duration,
    options.delay,
    options.stagger,
    options.ease,
    options.from,
    options.onComplete,
  ]);

  return ref;
}

/**
 * Hook: 커스텀 GSAP 애니메이션
 * 자유롭게 GSAP 애니메이션을 정의할 수 있는 Hook
 */
export function useGSAP<T extends HTMLElement>(
  animationFn: (element: T, ctx: gsap.Context) => void | (() => void)
): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const scope = ref.current;
    let userCleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      if (!ref.current) return;
      userCleanup = animationFn(ref.current, self);
    }, scope);

    return () => {
      if (typeof userCleanup === "function") userCleanup();
      ctx.revert();
    };
  }, [animationFn]);

  return ref;
}

/**
 * Hook: 스크롤 트리거 애니메이션
 * 요소가 뷰포트에 들어올 때 애니메이션 실행
 *
 * 참고: ScrollTrigger 플러그인이 필요합니다
 * import { ScrollTrigger } from "gsap/ScrollTrigger";
 * gsap.registerPlugin(ScrollTrigger);
 */
export function useScrollTrigger<T extends HTMLElement>(
  options: GSAPAnimationOptions & {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // ScrollTrigger가 등록되지 않았다면 경고
    const plugins = (gsap.plugins as unknown as Record<string, unknown> | undefined) ?? undefined;
    if (!plugins || !("scrollTrigger" in plugins)) {
      console.warn(
        "ScrollTrigger plugin is not registered. Please import and register it first."
      );
      return;
    }

    gsap.fromTo(ref.current, options.from ?? { opacity: 0, y: 50 }, {
      ...(options.to ?? { opacity: 1, y: 0 }),
      duration: options.duration ?? 1,
      ease: options.ease ?? "power2.out",
      scrollTrigger: {
        trigger: options.trigger ?? ref.current,
        start: options.start ?? "top 80%",
        end: options.end,
        scrub: options.scrub,
      },
      onComplete: options.onComplete,
    });
  }, [
    options.from,
    options.to,
    options.duration,
    options.ease,
    options.trigger,
    options.start,
    options.end,
    options.scrub,
    options.onComplete,
  ]);

  return ref;
}
