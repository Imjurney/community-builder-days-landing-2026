import { useRef, useState, useCallback, useEffect } from "react";

interface UseDragOptions {
  onDragEnd?: (deltaX: number) => void;
  threshold?: number;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  currentX: number;
  deltaX: number;
}

export function useDrag({ onDragEnd, threshold = 50 }: UseDragOptions = {}) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    deltaX: 0,
  });

  const elementRef = useRef<HTMLElement>(null);

  const handleStart = useCallback((clientX: number) => {
    setDragState({
      isDragging: true,
      startX: clientX,
      currentX: clientX,
      deltaX: 0,
    });
  }, []);

  const handleMove = useCallback((clientX: number) => {
    setDragState((prev) => {
      if (!prev.isDragging) return prev;

      const deltaX = clientX - prev.startX;
      return {
        ...prev,
        currentX: clientX,
        deltaX,
      };
    });
  }, []);

  const handleEnd = useCallback(() => {
    setDragState((prev) => {
      if (!prev.isDragging) return prev;

      // threshold를 넘었을 때만 onDragEnd 호출
      if (Math.abs(prev.deltaX) > threshold && onDragEnd) {
        onDragEnd(prev.deltaX);
      }

      return {
        isDragging: false,
        startX: 0,
        currentX: 0,
        deltaX: 0,
      };
    });
  }, [onDragEnd, threshold]);

  // 마우스 이벤트
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    },
    [handleStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 터치 이벤트
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 전역 이벤트 리스너 등록/해제
  useEffect(() => {
    if (dragState.isDragging) {
      // 마우스 이벤트
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // 터치 이벤트
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    dragState.isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return {
    dragState,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
    elementRef,
  };
}
