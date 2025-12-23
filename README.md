# Community Builder Days 2025 (Vite + Tailwind)

정적 행사 홍보 페이지용 템플릿입니다. 데이터/문구는 `src/constants/`에서 관리하도록 구성했습니다.

## 요구 사항
- Node.js 18+ 권장

## 시작하기
```bash
npm install
npm run dev
```

## 커스터마이즈 포인트
- 행사 기본 정보: `src/constants/event.ts`
- 섹션 네비게이션: `src/constants/navigation.ts`
- 하이라이트/연사/일정/FAQ/스폰서: `src/constants/*.ts`
- 유틸리티 `cn`: `src/lib/utils.ts` (`clsx` + `tailwind-merge`)

