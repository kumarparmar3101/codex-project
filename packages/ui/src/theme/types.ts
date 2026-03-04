import type { CSSProperties } from 'react';

export type BrandName = 'district-web' | 'bookmyshow-web';

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  secondary: string;
  danger: string;
  success: string;
  accent: string;
}

export interface TypographyTokens {
  fontFamily: string;
  headingWeight: number;
  bodyWeight: number;
  captionWeight: number;
}

export interface RadiusTokens {
  sm: number;
  md: number;
  lg: number;
  pill: number;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ShadowTokens {
  sm: string;
  md: string;
}

export interface ThemeTokens {
  brand: BrandName;
  colors: ColorTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  shadow: ShadowTokens;
}

export type StyleOverrides = Partial<Record<string, CSSProperties>>;
