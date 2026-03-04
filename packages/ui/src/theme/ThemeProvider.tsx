import { createContext, useContext, useMemo, type CSSProperties, type PropsWithChildren } from 'react';

import { districtWebTheme, getThemeByBrand } from './tokens';
import type { BrandName, ThemeTokens } from './types';

const ThemeContext = createContext<ThemeTokens>(districtWebTheme);

export interface ThemeProviderProps {
  brand?: BrandName;
  theme?: ThemeTokens;
  style?: CSSProperties;
}

export function ThemeProvider({ brand, theme, style, children }: PropsWithChildren<ThemeProviderProps>) {
  const resolvedTheme = useMemo(() => {
    if (theme) return theme;
    if (brand) return getThemeByBrand(brand);
    return districtWebTheme;
  }, [brand, theme]);

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      <div
        style={{
          background: resolvedTheme.colors.background,
          color: resolvedTheme.colors.text,
          fontFamily: resolvedTheme.typography.fontFamily,
          ...style,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeTokens {
  return useContext(ThemeContext);
}
