---
inclusion: always
---

# 삼항 연산자 단순하게 사용하기

## 원칙

삼항 연산자를 복잡하게 사용하면 조건의 구조가 명확하게 보이지 않아서 코드를 읽기 어려울 수 있습니다. **중첩된 삼항 연산자 대신 if 문을 사용**하세요.

## 왜 중요한가?

- **가독성 향상**: 조건 분기가 명확하게 보여 코드 이해가 쉬워집니다
- **유지보수성**: 새로운 조건을 추가하거나 수정할 때 실수를 줄일 수 있습니다
- **디버깅 용이**: 각 조건에 브레이크포인트를 설정하기 쉽습니다

## 나쁜 예시

```typescript
// ❌ 나쁜 예: 중첩된 삼항 연산자
const status =
  A조건 && B조건 
    ? "BOTH" 
    : A조건 || B조건 
      ? (A조건 ? "A" : "B") 
      : "NONE"

// ❌ 나쁜 예: JSX에서 복잡한 삼항 연산자
return (
  <div>
    {isLoading ? (
      <Spinner />
    ) : error ? (
      <ErrorMessage error={error} />
    ) : data ? (
      <DataView data={data} />
    ) : (
      <EmptyState />
    )}
  </div>
)

// ❌ 나쁜 예: 조건부 클래스명
const className = isActive 
  ? isDisabled 
    ? 'active disabled' 
    : 'active' 
  : isDisabled 
    ? 'disabled' 
    : 'default'
```

**문제점:**
- 조건의 흐름을 따라가기 어려움
- 어떤 조건에서 어떤 값이 반환되는지 한눈에 파악하기 힘듦
- 수정 시 실수하기 쉬움

## 좋은 예시

### 1. IIFE(즉시 실행 함수)를 사용한 개선

```typescript
// ✅ 좋은 예: if 문으로 명확하게 표현
const status = (() => {
  if (A조건 && B조건) return "BOTH"
  if (A조건) return "A"
  if (B조건) return "B"
  return "NONE"
})()
```

### 2. 별도 함수로 분리

```typescript
// ✅ 좋은 예: 함수로 분리하여 재사용 가능하게
function getStatus(A조건: boolean, B조건: boolean) {
  if (A조건 && B조건) return "BOTH"
  if (A조건) return "A"
  if (B조건) return "B"
  return "NONE"
}

const status = getStatus(A조건, B조건)
```

### 3. JSX에서의 개선

```typescript
// ✅ 좋은 예: 조기 반환(early return) 사용
function MyComponent() {
  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <DataView data={data} />
}

// ✅ 좋은 예: 별도 렌더 함수로 분리
function MyComponent() {
  const renderContent = () => {
    if (isLoading) return <Spinner />
    if (error) return <ErrorMessage error={error} />
    if (!data) return <EmptyState />
    return <DataView data={data} />
  }

  return <div>{renderContent()}</div>
}
```

### 4. 클래스명 처리 개선

```typescript
// ✅ 좋은 예: 헬퍼 함수 사용
function getButtonClass(isActive: boolean, isDisabled: boolean) {
  if (isDisabled) return 'disabled'
  if (isActive) return 'active'
  return 'default'
}

const className = getButtonClass(isActive, isDisabled)

// ✅ 좋은 예: 배열 조합 (간단한 경우)
const className = [
  'button',
  isActive && 'active',
  isDisabled && 'disabled'
].filter(Boolean).join(' ')

// ✅ 좋은 예: clsx 라이브러리 사용
import clsx from 'clsx'

const className = clsx('button', {
  active: isActive,
  disabled: isDisabled
})
```

## 예외: 단순한 삼항 연산자는 OK

```typescript
// ✅ OK: 단순한 이진 선택
const label = isActive ? '활성' : '비활성'

// ✅ OK: null 체크
const displayName = user?.name ?? '익명'

// ✅ OK: 간단한 JSX 조건부 렌더링
return <div>{isVisible && <Content />}</div>
```

## 적용 가이드

### 삼항 연산자를 if 문으로 바꿔야 하는 경우

1. **중첩된 삼항 연산자** (삼항 연산자 안에 또 다른 삼항 연산자)
2. **3개 이상의 조건 분기**
3. **조건이나 결과값이 복잡한 표현식**
4. **한 줄이 80자를 넘어가는 경우**

### 리팩토링 단계

1. 삼항 연산자를 if-else 문으로 변환
2. 조기 반환(early return) 패턴 적용
3. 필요시 별도 함수로 추출
4. 함수명으로 의도를 명확히 표현

## ESLint 규칙

프로젝트에서는 다음 ESLint 규칙이 적용되어 있습니다:

```javascript
'no-nested-ternary': 'error'  // 중첩된 삼항 연산자 금지
```

## 체크리스트

- [ ] 삼항 연산자가 중첩되어 있지 않은가?
- [ ] 조건 분기가 3개 이상이 아닌가?
- [ ] 한 줄로 읽었을 때 의미가 명확한가?
- [ ] 다른 개발자가 5초 안에 이해할 수 있는가?
- [ ] 새로운 조건을 추가하기 쉬운가?

## 실전 예시

### Before (복잡한 삼항 연산자)

```typescript
const getToolButtonClass = (isActive: boolean) =>
  isActive
    ? 'p-2.5 rounded-lg transition-all bg-blue-500 text-white shadow-md'
    : 'p-2.5 rounded-lg transition-all bg-gray-100 text-gray-700 hover:bg-gray-200'
```

### After (if 문으로 개선)

```typescript
const getToolButtonClass = (isActive: boolean) => {
  if (isActive) {
    return 'p-2.5 rounded-lg transition-all bg-blue-500 text-white shadow-md'
  }
  
  return 'p-2.5 rounded-lg transition-all bg-gray-100 text-gray-700 hover:bg-gray-200'
}
```

**개선 효과:**
- 조건 분기가 명확하게 보임
- 새로운 상태(예: disabled) 추가가 쉬움
- 각 케이스에 주석을 달기 쉬움
