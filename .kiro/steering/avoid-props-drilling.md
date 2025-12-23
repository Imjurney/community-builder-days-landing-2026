---
inclusion: always
---

# Props Drilling 피하기

## 원칙

Props Drilling은 부모 컴포넌트와 자식 컴포넌트 사이에 **불필요한 결합도**가 생겼다는 신호입니다. Props를 단순히 전달만 하는 중간 컴포넌트는 제거하거나 개선해야 합니다.

## 왜 중요한가?

- **결합도 감소**: prop 이름이 변경되면 모든 중간 컴포넌트를 수정해야 합니다
- **유지보수성**: 불필요한 중간 추상화를 제거하여 코드 이해가 쉬워집니다
- **리팩토링 용이**: 변경 영향 범위를 최소화할 수 있습니다

## 나쁜 예시

```tsx
// ❌ 나쁜 예: Props Drilling
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("")
  
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody
        items={items}
        keyword={keyword}
        onKeywordChange={setKeyword}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </Modal>
  )
}

function ItemEditBody({
  keyword,
  onKeywordChange,
  items,
  recommendedItems,
  onConfirm,
  onClose
}) {
  return (
    <>
      <Input value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </>
  )
}
```

**문제점:**
- `ItemEditBody`는 `items`, `recommendedItems`를 사용하지 않고 단순히 전달만 함
- prop 이름 변경 시 모든 중간 컴포넌트 수정 필요
- 컴포넌트의 실제 역할이 불명확함

## 해결 방법

### 1단계: Composition 패턴 (우선 고려)

```tsx
// ✅ 좋은 예: children을 활용한 Composition
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("")
  
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody
        keyword={keyword}
        onKeywordChange={setKeyword}
        onClose={onClose}
      >
        <ItemEditList
          keyword={keyword}
          items={items}
          recommendedItems={recommendedItems}
          onConfirm={onConfirm}
        />
      </ItemEditBody>
    </Modal>
  )
}

function ItemEditBody({ children, keyword, onKeywordChange, onClose }) {
  return (
    <>
      <Input value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
      <Button onClick={onClose}>닫기</Button>
      {children}
    </>
  )
}
```

**장점:**
- `ItemEditBody`는 자신이 실제로 사용하는 props만 받음
- 불필요한 props drilling 제거
- 컴포넌트 역할이 명확해짐

### 2단계: Context API (최후의 수단)

Composition으로 해결되지 않고, 트리가 깊을 때만 사용:

```tsx
// ✅ Context API 사용
const ItemEditContext = createContext<{
  items: Item[]
  recommendedItems: Item[]
}>()

function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("")
  
  return (
    <ItemEditContext.Provider value={{ items, recommendedItems }}>
      <Modal open={open} onClose={onClose}>
        <ItemEditBody
          keyword={keyword}
          onKeywordChange={setKeyword}
          onClose={onClose}
        >
          <ItemEditList keyword={keyword} onConfirm={onConfirm} />
        </ItemEditBody>
      </Modal>
    </ItemEditContext.Provider>
  )
}

function ItemEditList({ keyword, onConfirm }) {
  const { items, recommendedItems } = useContext(ItemEditContext)
  // ...
}
```

## 적용 가이드

### Props Drilling 판단 기준

다음 질문에 "예"라면 Props Drilling 문제가 있습니다:

1. **중간 컴포넌트가 prop을 사용하지 않고 단순히 전달만 하는가?**
2. **prop 이름 변경 시 3개 이상의 컴포넌트를 수정해야 하는가?**
3. **컴포넌트의 props가 10개 이상인가?**

### 해결 순서

```
1. Composition 패턴 검토
   ↓ (해결 안 됨)
2. 컴포넌트 구조 재설계 검토
   ↓ (해결 안 됨)
3. Context API 적용
```

### Composition vs Context API 선택 기준

**Composition을 사용해야 할 때:**
- 컴포넌트 트리가 2-3단계로 얕음
- props가 명확한 의도를 가지고 있음
- 재사용성이 중요함

**Context API를 사용해야 할 때:**
- 컴포넌트 트리가 4단계 이상으로 깊음
- 여러 컴포넌트에서 동일한 데이터를 사용
- 전역 상태에 가까운 데이터 (테마, 인증 정보 등)

## 실전 예시

### Before: Props Drilling 문제

```tsx
function FeedbackEditor() {
  const [tool, setTool] = useState('select')
  const [elements, setElements] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [penColor, setPenColor] = useState('#000000')
  
  return (
    <div>
      <Toolbar
        tool={tool}
        setTool={setTool}
        penColor={penColor}
        setPenColor={setPenColor}
      />
      <Canvas
        tool={tool}
        setTool={setTool}
        elements={elements}
        setElements={setElements}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        penColor={penColor}
      />
    </div>
  )
}
```

### After: Composition 패턴 적용

```tsx
function FeedbackEditor() {
  const editorState = useFeedbackEditor()
  
  return (
    <FeedbackEditorProvider value={editorState}>
      <div>
        <Toolbar />
        <Canvas />
      </div>
    </FeedbackEditorProvider>
  )
}

function Toolbar() {
  const { tool, setTool, penColor, setPenColor } = useFeedbackEditorContext()
  // Toolbar는 필요한 것만 가져옴
}

function Canvas() {
  const { tool, elements, selectedIds } = useFeedbackEditorContext()
  // Canvas는 필요한 것만 가져옴
}
```

## 주의사항

### Context API 남용 방지

```tsx
// ❌ 나쁜 예: 모든 것을 Context에 넣기
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'ko',
  items: [],
  selectedItem: null,
  // ... 수십 개의 값
})

// ✅ 좋은 예: 관심사별로 Context 분리
const UserContext = createContext({ user: null })
const ThemeContext = createContext({ theme: 'light' })
const ItemsContext = createContext({ items: [], selectedItem: null })
```

### Props는 명확한 의도를 담아야 함

```tsx
// ✅ OK: 이 props는 컴포넌트의 역할을 명확히 보여줌
function Button({ onClick, disabled, children }) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>
}

// ❌ 나쁜 예: 단순 전달용 props
function ButtonWrapper({ onClick, disabled, children }) {
  return <Button onClick={onClick} disabled={disabled}>{children} />
}
```

## 체크리스트

- [ ] 중간 컴포넌트가 props를 실제로 사용하는가?
- [ ] Composition 패턴으로 해결 가능한가?
- [ ] Context API가 정말 필요한가?
- [ ] Context를 관심사별로 분리했는가?
- [ ] Props가 컴포넌트의 역할을 명확히 표현하는가?
