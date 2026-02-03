"use client";
import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

export type ThemeVariant = "yotsuba" | "tomorrow" | "ocean" | "dracula";

// General Theming

const baseOptions: ThemeOptions = {
	typography: {
		fontFamily: "var(--font-geist-sans), Helvetica, Arial, sans-serif",
		h1: { fontWeight: 800, letterSpacing: "-0.02em" },
		button: { fontWeight: 600, textTransform: "none" },
	},
	shape: {
		borderRadius: 10,
	},
	components: {
		MuiButton: {
			defaultProps: { disableElevation: true },
			styleOverrides: {
				root: { padding: "8px 20px" },
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: { backgroundImage: "none" },
			},
		},
	},
};

// Theme Variants
const themeOptions: Record<ThemeVariant, ThemeOptions> = {
	yotsuba: {
		palette: {
			mode: "light",
			primary: { main: "#1976d2" },
			background: { default: "#f8f9fa", paper: "#ffffff" },
		},
	},
	tomorrow: {
		palette: {
			mode: "dark",
			primary: { main: "#90caf9" },
			background: { default: "#0b0e14", paper: "#161b22" },
		},
	},
	ocean: {
		palette: {
			mode: "dark",
			primary: { main: "#00e5ff" },
			background: { default: "#001e26", paper: "#002f3b" },
			text: { primary: "#e0f7fa" },
		},
	},
	dracula: {
		palette: {
			mode: "dark",
			primary: { main: "#bd93f9" },
			secondary: { main: "#ff79c6" },
			background: { default: "#282a36", paper: "#44475a" },
		},
	},
};

export const buildTheme = (variant: ThemeVariant) => {
	const selectedPalette = themeOptions[variant] || themeOptions.yotsuba;

	// createTheme can take multiple objects; it merges them left to right
	const theme = createTheme(baseOptions, selectedPalette);

	return responsiveFontSizes(theme);
};

export const themeNames = Object.keys(themeOptions) as ThemeVariant[];
