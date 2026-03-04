import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import {
  BrandName,
  ThemeTokens,
  districtTheme,
  themeRegistry
} from "./tokens";

type ThemeContextValue = {
  theme: ThemeTokens;
  brand: BrandName;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: districtTheme,
  brand: "district-web"
});

export type AppThemeProviderProps = PropsWithChildren<{
  brand?: BrandName;
  themeOverride?: Partial<ThemeTokens>;
}>;

export function AppThemeProvider({
  brand = "district-web",
  themeOverride,
  children
}: AppThemeProviderProps) {
  const value = useMemo(() => {
    const base = themeRegistry[brand];
    const mergedTheme = themeOverride
      ? {
          ...base,
          ...themeOverride,
          colors: { ...base.colors, ...themeOverride.colors },
          typography: { ...base.typography, ...themeOverride.typography },
          radius: { ...base.radius, ...themeOverride.radius },
          spacing: { ...base.spacing, ...themeOverride.spacing },
          shadows: { ...base.shadows, ...themeOverride.shadows }
        }
      : base;

    return {
      theme: mergedTheme,
      brand
    };
  }, [brand, themeOverride]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeTokens() {
  return useContext(ThemeContext).theme;
}

export function useBrand() {
  return useContext(ThemeContext).brand;
}
