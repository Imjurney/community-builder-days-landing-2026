---
inclusion: always
---

# Project Structure

## Directory Organization

```
src/
├── components/     # Reusable UI components (Button, Badge, Navbar, etc.)
├── sections/       # Page sections (Hero, Speakers, Schedule, FAQ, etc.)
├── constants/      # Static data and configuration
├── types/          # TypeScript type definitions
├── lib/            # Utility functions
└── styles/         # Global CSS and Tailwind config
```

## Architecture Patterns

### Component Structure

- **Components** (`src/components/`): Small, reusable UI elements

  - Accept props via TypeScript interfaces
  - Use `cn()` utility for className merging
  - Extend native HTML element props when appropriate (e.g., `ComponentPropsWithoutRef<"a">`)

- **Sections** (`src/sections/`): Full-width page sections
  - Import data from `src/constants/`
  - Compose smaller components
  - Each section is self-contained

### Data Management

- All content lives in `src/constants/*.ts`
- Type definitions in `src/types/event.ts`
- Components import and render this data

### Styling Conventions

- Use Tailwind utility classes
- Custom design tokens defined in CSS variables (HSL format):
  - `--primary`, `--bg`, `--fg`, `--card`, `--muted`, `--ring`
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Component variants use object mapping pattern

### Type Safety

- All components use TypeScript
- Props typed with interfaces or type aliases
- Extend native element props where applicable
- Constants have explicit type annotations

## Entry Points

- `index.html` - HTML template
- `src/main.tsx` - React app mount point
- `src/App.tsx` - Main component with section composition
