/**
 * GSAP Hook 사용 예시
 *
 * 이 파일은 실제 프로젝트에서 사용하지 않으며,
 * 각 Hook의 사용법을 보여주는 예시입니다.
 */

import {
    useFadeIn,
    useSlideUp,
    useScaleIn,
    useStagger,
    useGSAP,
    useScrollTrigger,
} from "@/lib/gsap";

// ============================================
// 1. useFadeIn: 페이드인 애니메이션
// ============================================
function FadeInExample() {
    const ref = useFadeIn<HTMLDivElement>({
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
    });

    return (
        <div ref={ref}>
            <h1>페이드인으로 나타나는 제목</h1>
        </div>
    );
}

// ============================================
// 2. useSlideUp: 슬라이드업 애니메이션
// ============================================
function SlideUpExample() {
    const ref = useSlideUp<HTMLDivElement>({
        duration: 0.8,
        delay: 0.3,
        distance: 100, // 아래에서 100px 위로 이동
    });

    return (
        <div ref={ref}>
            <p>아래에서 위로 슬라이드하며 나타납니다</p>
        </div>
    );
}

// ============================================
// 3. useScaleIn: 스케일 애니메이션
// ============================================
function ScaleInExample() {
    const ref = useScaleIn<HTMLButtonElement>({
        duration: 0.6,
        from: 0.5, // 50% 크기에서 시작
        ease: "back.out(1.7)", // 튕기는 효과
    });

    return <button ref={ref}>확대되며 나타나는 버튼</button>;
}

// ============================================
// 4. useStagger: 순차 애니메이션
// ============================================
function StaggerExample() {
    const ref = useStagger<HTMLUListElement>(".item", {
        duration: 0.6,
        stagger: 0.1, // 각 아이템마다 0.1초 간격
        from: { opacity: 0, x: -50 }, // 왼쪽에서 나타남
    });

    return (
        <ul ref={ref}>
            <li className="item">아이템 1</li>
            <li className="item">아이템 2</li>
            <li className="item">아이템 3</li>
            <li className="item">아이템 4</li>
        </ul>
    );
}

// ============================================
// 5. useGSAP: 커스텀 애니메이션
// ============================================
function CustomAnimationExample() {
    const ref = useGSAP<HTMLDivElement>((element, ctx) => {
        // 복잡한 타임라인 애니메이션
        const tl = ctx.timeline();

        tl.from(element, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
        })
            .to(element, {
                rotation: 360,
                duration: 1,
            })
            .to(element, {
                x: 100,
                duration: 0.5,
            });
    });

    return (
        <div ref={ref}>
            <div>복잡한 커스텀 애니메이션</div>
        </div>
    );
}

// ============================================
// 6. useScrollTrigger: 스크롤 트리거 애니메이션
// ============================================
// 주의: ScrollTrigger 플러그인 등록 필요
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerExample() {
    const ref = useScrollTrigger<HTMLDivElement>({
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0 },
        start: "top 80%", // 요소가 뷰포트 80% 지점에 도달하면 시작
        scrub: true, // 스크롤에 따라 애니메이션 진행
    });

    return (
        <div ref={ref}>
            <p>스크롤하면 나타나는 콘텐츠</p>
        </div>
    );
}

// ============================================
// 실전 예시: Hero 섹션 애니메이션
// ============================================
function HeroSectionExample() {
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

    const cardsRef = useStagger<HTMLDivElement>(".card", {
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
    });

    return (
        <section>
            <h1 ref={titleRef}>Community Builders Day 2026</h1>
            <p ref={descRef}>커뮤니티를 지속 가능하게 만드는 실전 하루</p>
            <div ref={buttonRef}>
                <button>지금 등록하기</button>
            </div>
            <div ref={cardsRef}>
                <div className="card">카드 1</div>
                <div className="card">카드 2</div>
                <div className="card">카드 3</div>
            </div>
        </section>
    );
}

// ============================================
// 조건부 애니메이션 예시
// ============================================
function ConditionalAnimationExample({
    shouldAnimate,
}: {
    shouldAnimate: boolean;
}) {
    // 조건에 따라 애니메이션 적용 여부 결정
    const ref = useSlideUp<HTMLDivElement>(
        shouldAnimate ? { duration: 0.8 } : { duration: 0 } // duration을 0으로 설정하면 즉시 표시
    );

    return (
        <div ref={ref}>
            <p>조건부 애니메이션</p>
        </div>
    );
}

export {
    FadeInExample,
    SlideUpExample,
    ScaleInExample,
    StaggerExample,
    CustomAnimationExample,
    ScrollTriggerExample,
    HeroSectionExample,
    ConditionalAnimationExample,
};
