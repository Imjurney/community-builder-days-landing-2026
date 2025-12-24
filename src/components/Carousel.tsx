import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useDrag } from "@/hooks/useDrag";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;
  const itemsToShow = Math.floor((1440 - 230) / itemWidth); // 컨테이너 너비에서 패딩 제외
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const handleDragEnd = useCallback(
    (deltaX: number) => {
      // 드래그 방향에 따라 슬라이드
      if (deltaX > 0) {
        // 오른쪽으로 드래그 (이전 슬라이드)
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else {
        // 왼쪽으로 드래그 (다음 슬라이드)
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      }
    },
    [maxIndex]
  );

  const { dragState, dragHandlers } = useDrag({
    onDragEnd: handleDragEnd,
    threshold: 50,
  });

  const translateX =
    -(currentIndex * (itemWidth + gap)) +
    (dragState.isDragging ? dragState.deltaX : 0);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 캐로셀 컨테이너 */}
      <div
        ref={containerRef}
        className={cn(
          "flex transition-transform duration-300 ease-out select-none overflow-x-scroll",
          dragState.isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          transform: `translateX(${translateX}px)`,
          transitionDuration: dragState.isDragging ? "0ms" : "300ms",
        }}
        {...dragHandlers}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="shrink-0 pointer-events-none"
            style={{
              width: `${itemWidth}px`,
              marginRight: index < children.length - 1 ? `${gap}px` : "0",
            }}
          >
            <div className="pointer-events-auto">{child}</div>
          </div>
        ))}
      </div>

      {/* 오른쪽 그라데이션 오버레이 */}
      {showOverlay && (
        <div className="absolute top-0 right-0 w-[362px] h-full bg-linear-to-l from-black/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
