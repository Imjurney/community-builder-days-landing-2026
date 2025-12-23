# 조건부 렌더링 책임 분리

## 원칙

컴포넌트 내부에서 "언제 보여줄지"를 결정하지 마세요. **부모가 조건을 판단**하고, 컴포넌트는 **"어떻게 보여줄지"만 담당**해야 합니다.

## 왜 중요한가?

- **단일 책임**: 컴포넌트가 "조건 판단"과 "렌더링" 두 가지 책임을 가지면 복잡해짐
- **명시적 동작**: 부모가 렌더링했는데 아무것도 안 나오면 혼란스러움
- **재사용성**: 다른 조건에서도 같은 UI를 보여주고 싶을 때 재사용 가능
- **테스트 용이**: 조건 로직과 렌더링 로직을 분리해서 테스트 가능

## 나쁜 예시

```tsx
// ❌ 나쁜 예: 컴포넌트 내부에서 조건 판단
function SelectionInfo({ count }: { count: number }) {
  if (count === 0) return null  // 암묵적으로 숨김

  return <div>{count}개 선택됨</div>
}

// 부모에서 사용
<SelectionInfo count={selectedIds.length} />
```

**문제점:**
- `count={0}`을 전달했는데 아무것도 안 나옴 → 암묵적 동작
- "0개 선택됨"을 보여주고 싶은 경우 재사용 불가
- 컴포넌트가 두 가지 책임을 가짐

## 좋은 예시

```tsx
// ✅ 좋은 예: 컴포넌트는 렌더링만 담당
function SelectionInfo({ count }: { count: number }) {
  return <div>{count}개 선택됨</div>
}

// 부모에서 조건 판단
{selectedIds.length > 0 && <SelectionInfo count={selectedIds.length} />}
```

**장점:**
- 컴포넌트 동작이 명시적
- 부모가 "언제 보여줄지" 완전히 제어
- 다른 조건에서도 재사용 가능

## 적용 가이드

### 컴포넌트 내부에서 피해야 할 패턴

```tsx
// ❌ 피해야 할 패턴들
function Component({ data }) {
  if (!data) return null           // 부모가 판단해야 함
  if (data.length === 0) return null  // 부모가 판단해야 함
  if (!isVisible) return null      // 부모가 판단해야 함
  
  return <div>...</div>
}
```

### 부모에서 조건 판단

```tsx
// ✅ 부모에서 명시적으로 조건 판단
{data && <Component data={data} />}
{data.length > 0 && <Component data={data} />}
{isVisible && <Component />}
```

### 예외: 로딩/에러 상태

컴포넌트가 자체적으로 데이터를 fetch하는 경우는 내부에서 상태 처리 가능:

```tsx
// ✅ OK: 자체 데이터 fetch 시 내부 상태 처리
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUser(userId)
  
  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  
  return <div>{data.name}</div>
}
```

## 체크리스트

- [ ] 컴포넌트가 props 기반으로 `return null`하고 있지 않은가?
- [ ] 부모가 "언제 보여줄지" 명시적으로 제어하고 있는가?
- [ ] 컴포넌트가 "어떻게 보여줄지"만 담당하고 있는가?
- [ ] 다른 조건에서도 재사용 가능한가?
