---
inclusion: always
---

# Tech Stack

## Core Technologies

- **React 18** with TypeScript
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling with custom design tokens
- **SWC** - Fast TypeScript/React compilation via `@vitejs/plugin-react-swc`

## Key Dependencies

- `clsx` + `tailwind-merge` - Combined in `cn()` utility for conditional class merging
- `count-down-react` - Countdown timer component

## Build System

### Common Commands

```bash
# Development server (hot reload)
pnpm dev

# Type checking
pnpm typecheck

# Production build
pnpm build

# Preview production build
pnpm preview
```

### Build Process

1. TypeScript compilation: `tsc -b`
2. Vite bundling: `vite build`

## Path Aliases

- `@/` maps to `src/` directory (configured in `vite.config.ts`)
- Always use `@/` imports for internal modules

## Node Version

- Requires Node.js 18+
