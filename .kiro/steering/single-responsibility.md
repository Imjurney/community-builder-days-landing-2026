---
inclusion: always
---

# 단일 책임 원칙 (Single Responsibility Principle)

## 원칙

컴포넌트, Hook, 함수는 **하나의 명확한 책임**만 가져야 합니다. 쿼리 파라미터, 상태, API 호출과 같은 로직의 종류에 따라서 함수나 컴포넌트, Hook을 나누지 마세요.

## 왜 중요한가?

- **결합도 감소**: 한 번에 다루는 맥락의 종류가 많아지면 이해하기 힘들고 수정하기 어려운 코드가 됩니다
- **영향 범위 제한**: 수정 시 예상하지 못한 부작용을 방지할 수 있습니다
- **재사용성 향상**: 작은 단위로 분리된 코드는 다른 곳에서도 쉽게 재사용할 수 있습니다
- **테스트 용이성**: 단일 책임을 가진 코드는 테스트하기 쉽습니다

## 나쁜 예시

```typescript
// ❌ 나쁜 예: 페이지의 모든 상태를 한 Hook에서 관리
export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam
  })

  return {
    values: {
      cardId: query.cardId ?? undefined,
      statementId: query.statementId ?? undefined,
      dateFrom: query.dateFrom ?? defaultDateFrom,
      dateTo: query.dateTo ?? defaultDateTo,
      statusList: query.statusList
    },
    controls: {
      setCardId: (cardId: number) => setQuery({ cardId }, 'replaceIn'),
      setStatementId: (statementId: number) => setQuery({ statementId }, 'replaceIn'),
      setDateFrom: (date?: Date) => setQuery({ dateFrom: date }, 'replaceIn'),
      setDateTo: (date?: Date) => setQuery({ dateTo: date }, 'replaceIn'),
      setStatusList: (statusList?: string[]) => setQuery({ statusList }, 'replaceIn')
    }
  }
}
```

**문제점:**
- 이 Hook은 "페이지의 모든 쿼리 파라미터 관리"라는 광범위한 책임을 가짐
- 한 파라미터를 수정하면 다른 파라미터에도 영향을 줄 수 있음
- 특정 파라미터만 필요한 컴포넌트도 전체 Hook에 의존하게 됨

## 좋은 예시

```typescript
// ✅ 좋은 예: 각 파라미터별로 별도의 Hook 작성
export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam('cardId', NumberParam)
  
  const setCardId = useCallback((cardId: number) => {
    _setCardId(cardId, 'replaceIn')
  }, [_setCardId])

  return [cardId ?? undefined, setCardId] as const
}

export function useDateRangeQueryParams() {
  const [dateFrom, setDateFrom] = useQueryParam('dateFrom', DateParam)
  const [dateTo, setDateTo] = useQueryParam('dateTo', DateParam)

  return {
    dateFrom: dateFrom ?? defaultDateFrom,
    dateTo: dateTo ?? defaultDateTo,
    setDateFrom: (date?: Date) => setDateFrom(date, 'replaceIn'),
    setDateTo: (date?: Date) => setDateTo(date, 'replaceIn')
  }
}
```

**장점:**
- 각 Hook이 명확한 하나의 책임만 가짐
- 필요한 Hook만 선택적으로 사용 가능
- 수정 시 영향 범위가 제한됨
- 테스트와 유지보수가 쉬움

## 컴포넌트 분리 예시

```typescript
// ❌ 나쁜 예: 하나의 컴포넌트에 너무 많은 책임
function Canvas() {
  // 드래그 로직
  const [dragging, setDragging] = useState(null)
  // 그리기 로직
  const [isDrawing, setIsDrawing] = useState(false)
  // 선택 로직
  const [selectedIds, setSelectedIds] = useState([])
  // 편집 로직
  const [editingText, setEditingText] = useState(null)
  // 클립보드 로직
  const [clipboard, setClipboard] = useState([])
  
  // 수백 줄의 로직...
  
  return <div>...</div>
}

// ✅ 좋은 예: 로직을 Hook으로 분리, UI는 별도 컴포넌트로
function Canvas(props) {
  const canvasLogic = useCanvas(props)
  return <CanvasView {...canvasLogic} />
}

// 로직만 담당
function useCanvas(props) {
  // 모든 상태와 로직 관리
  return { /* handlers and state */ }
}

// UI만 담당
function CanvasView(props) {
  return <div>...</div>
}
```

## 적용 가이드

1. **Hook 작성 시**
   - 하나의 Hook은 하나의 관심사만 다루기
   - 여러 상태를 관리해야 한다면 각각 별도 Hook으로 분리
   - Hook 이름에서 책임이 명확히 드러나야 함

2. **컴포넌트 작성 시**
   - 로직(비즈니스 로직, 상태 관리)과 UI(프레젠테이션)를 분리
   - 컴포넌트가 200줄을 넘어가면 분리를 고려
   - Container/Presenter 패턴 활용

3. **함수 작성 시**
   - 한 함수는 한 가지 일만 수행
   - 함수 이름이 "and", "or"를 포함하면 분리 신호
   - 함수가 여러 레벨의 추상화를 다루면 분리

## 체크리스트

- [ ] 이 Hook/컴포넌트/함수의 책임을 한 문장으로 설명할 수 있는가?
- [ ] 수정 시 예상치 못한 곳에 영향을 주지 않는가?
- [ ] 다른 곳에서 재사용할 수 있는가?
- [ ] 테스트 작성이 복잡하지 않은가?
- [ ] 이름만 보고 무엇을 하는지 알 수 있는가?
