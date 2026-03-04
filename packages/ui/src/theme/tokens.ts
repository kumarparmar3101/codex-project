export type BrandName = "district-web" | "bookmyshow-web";

export type ThemeTokens = {
  name: BrandName;
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryHover: string;
    accent: string;
    danger: string;
    success: string;
  };
  typography: {
    fontFamily: string;
    headingWeight: number;
    bodyWeight: number;
    captionSize: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    card: string;
    focus: string;
  };
};

export const districtTheme: ThemeTokens = {
  name: "district-web",
  colors: {
    background: "#f6f8fc",
    surface: "#ffffff",
    surfaceMuted: "#edf2ff",
    textPrimary: "#111827",
    textSecondary: "#4b5563",
    border: "#d1d5db",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    accent: "#8b5cf6",
    danger: "#ef4444",
    success: "#10b981"
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    captionSize: "0.75rem"
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    pill: "999px"
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem"
  },
  shadows: {
    card: "0 6px 18px rgba(59, 130, 246, 0.12)",
    focus: "0 0 0 3px rgba(59, 130, 246, 0.25)"
  }
};

export const bookMyShowTheme: ThemeTokens = {
  name: "bookmyshow-web",
  colors: {
    background: "#f7f8fa",
    surface: "#ffffff",
    surfaceMuted: "#fff1f3",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    primary: "#e11d48",
    primaryHover: "#be123c",
    accent: "#f97316",
    danger: "#dc2626",
    success: "#16a34a"
  },
  typography: {
    fontFamily: '"Mulish", "Segoe UI", sans-serif',
    headingWeight: 800,
    bodyWeight: 400,
    captionSize: "0.75rem"
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "999px"
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem"
  },
  shadows: {
    card: "0 8px 24px rgba(225, 29, 72, 0.1)",
    focus: "0 0 0 3px rgba(225, 29, 72, 0.25)"
  }
};

export const themeRegistry: Record<BrandName, ThemeTokens> = {
  "district-web": districtTheme,
  "bookmyshow-web": bookMyShowTheme
};
