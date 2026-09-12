# Sportsaal Website Project Guidelines

## Overview
Sportsaal is a premium sports infrastructure and athletic experience website built with high-impact visuals, modern dark aesthetic, bold typography, and responsive modular components.

## Tech Stack & Tooling
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS with CSS Custom Properties / Design Tokens
- **Icons**: Custom SVG / inline SVG icons
- **Fonts**: Google Fonts - Archivo Black (Headings/Display) & Archivo (Body Copy)

## Design System Tokens
- **Typography**:
  - Headings / Display: `'Archivo Black', 'Archivo', sans-serif`
  - Body / Subtitles / UI: `'Archivo', sans-serif`
- **Color Palette**:
  - Primary Brand Accent: `--color-primary: #FF1E27` (Sportsaal Red)
  - Primary Accent Hover: `--color-primary-hover: #D40C14`
  - Primary Accent Glow: `--color-primary-glow: rgba(255, 30, 39, 0.25)`
  - Deep Black Background: `--bg-primary: #0A0A0A`
  - Dark Surface / Card: `--bg-secondary: #121212`
  - Elevated Dark Surface: `--bg-tertiary: #1A1A1A`
  - Text Primary: `--text-primary: #FFFFFF`
  - Text Secondary: `--text-secondary: #A1A1AA`
  - Text Muted: `--text-muted: #71717A`
  - Subtle Border: `--border-subtle: rgba(255, 255, 255, 0.08)`
  - Focus Border: `--border-focus: rgba(255, 30, 39, 0.5)`

## Architectural Rules
1. **No Unused Placeholders**: Section folders exist for organization, but sections are implemented incrementally when requested.
2. **Modular Section Structure**: Each major section lives in `src/sections/<SectionName>/` with its component logic and styles.
3. **Reusable Layout & Common Components**: Placed in `src/components/layout/` or `src/components/common/`.
4. **Strict Aesthetics**: Clean dark aesthetic, strong red accents, precise responsive breakpoints, high performance.
