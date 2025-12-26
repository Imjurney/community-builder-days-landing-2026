import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useDrag } from "@/hooks/useDrag";
import arrowUp from "@/assets/icons/ArrowUp.svg";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemWidth?: number;
  gap?: number;
  showOverlay?: boolean;
}

export default function Carousel({
  children,
  className,
  itemWidth = 332,
  gap = 0,
  showOverlay = true,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startScrollLeftRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // 반응형 itemWidth 계산
  const getItemWidth = useCallback(() => {
    if (typeof window === "undefined") return itemWidth;
    return window.innerWidth < 1240 ? 260 : itemWidth;
  }, [itemWidth]);

  const [currentItemWidth, setCurrentItemWidth] = useState(getItemWidth());

  // 윈도우 리사이즈 시 itemWidth 업데이트
  useEffect(() => {
    const handleResize = () => {
      setCurrentItemWidth(getItemWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getItemWidth]);

  const handleDragEnd = useCallback(() => {
    // 드래그 종료 시 특별한 처리 없음
  }, []);

  const handlePrev = useCallback(() => {
    if (containerRef.current) {
      const paddingLeft = window.innerWidth < 1240 ? 20 : 0; // pl-5 = 20px
      const newIndex = Math.max(0, scrollProgress - 1);
      containerRef.current.scrollLeft =
        paddingLeft + newIndex * currentItemWidth;
    }
  }, [scrollProgress, currentItemWidth]);

  const handleNext = useCallback(() => {
    if (containerRef.current) {
      const paddingLeft = window.innerWidth < 1240 ? 20 : 0; // pl-5 = 20px
      const maxIndex = children.length - 1;
      const newIndex = Math.min(maxIndex, scrollProgress + 1);
      containerRef.current.scrollLeft =
        paddingLeft + newIndex * currentItemWidth;
    }
  }, [scrollProgress, currentItemWidth, children.length]);

  const { dragState, dragHandlers } = useDrag({
    onDragEnd: handleDragEnd,
    threshold: 5,
  });

  // 모바일에서는 드래그 비활성화
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1240;
  const shouldUseDrag = !isMobile;

  // 드래그 시작 시 현재 스크롤 위치 저장
  useEffect(() => {
    if (shouldUseDrag && dragState.isDragging && containerRef.current) {
      startScrollLeftRef.current = containerRef.current.scrollLeft;
    }
  }, [dragState.isDragging, shouldUseDrag]);

  // 드래그 중 실시간 스크롤 업데이트
  useEffect(() => {
    if (shouldUseDrag && dragState.isDragging && containerRef.current) {
      containerRef.current.scrollLeft =
        startScrollLeftRef.current - dragState.deltaX;
    }
  }, [dragState.isDragging, dragState.deltaX, shouldUseDrag]);

  // 스크롤 진행도 계산
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      if (isMobile) {
        // 모바일에서는 단순한 스크롤 계산
        const paddingLeft = 20; // pl-5 = 20px
        const adjustedScrollLeft = Math.max(0, scrollLeft - paddingLeft);
        const currentIndex = Math.round(adjustedScrollLeft / currentItemWidth);
        setScrollProgress(currentIndex);

        setIsAtStart(scrollLeft <= paddingLeft + 5);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
      } else {
        // 데스크톱에서는 기존 계산
        const currentIndex = Math.round(scrollLeft / currentItemWidth);
        setScrollProgress(currentIndex);

        setIsAtStart(scrollLeft <= 5);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
      }
    };

    updateProgress();
    container.addEventListener("scroll", updateProgress);

    return () => {
      container.removeEventListener("scroll", updateProgress);
    };
  }, [currentItemWidth, isMobile]);

  return (
    <div className={cn("relative", className)}>
      {/* 캐로셀 컨테이너 */}
      <div
        ref={containerRef}
        className={cn(
          "flex overflow-x-auto overflow-y-hidden xl:justify-center",
          "scrollbar-hide"
        )}
        style={{
          scrollBehavior:
            shouldUseDrag && dragState.isDragging ? "auto" : "smooth",
        }}
        {...(shouldUseDrag ? dragHandlers : {})}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="shrink-0 pointer-events-none"
            style={{
              //  width: `${itemWidth}px`,
              marginRight: index < children.length - 1 ? `${gap}px` : "0",
            }}
          >
            <div className="pointer-events-auto w-fit">{child}</div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      {showOverlay && (
        <div className="absolute top-4 left-4 gap-2 z-20 hidden xl:flex">
          {/* 이전 버튼 */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isAtStart}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
              "bg-white/10 backdrop-blur-sm",
              isAtStart
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/20 active:scale-95"
            )}
            aria-label="이전 슬라이드"
          >
            <img
              src={arrowUp}
              alt=""
              className="w-6 h-6 -rotate-90"
              aria-hidden="true"
            />
          </button>

          {/* 다음 버튼 */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isAtEnd}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
              "bg-white/10 backdrop-blur-sm",
              isAtEnd
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/20 active:scale-95"
            )}
            aria-label="다음 슬라이드"
          >
            <img
              src={arrowUp}
              alt=""
              className="w-6 h-6 rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/* 오른쪽 그라데이션 오버레이 */}
      {showOverlay && (
        <div className="absolute top-0 right-0 w-[362px] h-full bg-linear-to-l from-black/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
