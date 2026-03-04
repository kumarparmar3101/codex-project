import type { BrandName, ThemeTokens } from './types';

const sharedTheme = {
  typography: {
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
    captionWeight: 500,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.08)',
    md: '0 6px 18px rgba(0,0,0,0.12)',
  },
} satisfies Omit<ThemeTokens, 'brand' | 'colors'>;

export const districtWebTheme: ThemeTokens = {
  brand: 'district-web',
  ...sharedTheme,
  colors: {
    background: '#f9fafb',
    surface: '#ffffff',
    surfaceAlt: '#f4f6ff',
    text: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    primary: '#4f46e5',
    primaryText: '#ffffff',
    secondary: '#0ea5e9',
    danger: '#ef4444',
    success: '#16a34a',
    accent: '#f59e0b',
  },
};

export const bookMyShowTheme: ThemeTokens = {
  brand: 'bookmyshow-web',
  ...sharedTheme,
  colors: {
    background: '#fff7f8',
    surface: '#ffffff',
    surfaceAlt: '#fff1f4',
    text: '#111827',
    textMuted: '#6b7280',
    border: '#f3d5dc',
    primary: '#d81b60',
    primaryText: '#ffffff',
    secondary: '#7c3aed',
    danger: '#dc2626',
    success: '#059669',
    accent: '#f97316',
  },
};

export const themesByBrand: Record<BrandName, ThemeTokens> = {
  'district-web': districtWebTheme,
  'bookmyshow-web': bookMyShowTheme,
};

export function getThemeByBrand(brand: BrandName): ThemeTokens {
  return themesByBrand[brand];
}
