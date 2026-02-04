"use client";
import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

export type ThemeVariant = "yotsuba" | "tomorrow" | "yotsuba_b" | "dracula";

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
		MuiLink: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: "inherit",
					textDecoration: "none",
					cursor: "pointer",
					"&:hover": {
						color: theme.palette.primary.main,
						textDecoration: "underline",
					},
				}),
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderColor: theme.palette.divider,
				}),
			},
		},
	},
};

// Theme Variants
const themeOptions: Record<ThemeVariant, ThemeOptions> = {
	yotsuba: {
		palette: {
			mode: "light",
			primary: { main: "#af0a0f" }, // The iconic dark red used for board titles/links
			secondary: { main: "#789922" }, // Greentext
			background: {
				default: "#ffffee", // The classic cream/yellowish page background
				paper: "#f0e0d6", // The darker beige used for post containers
			},
			text: {
				primary: "#800000", // Dark maroon for thread subjects
				secondary: "#000000", // Standard black for post bodies
			},
			divider: "#d9bfb7", // Border color for posts
		},
	},

	yotsuba_b: {
		// Adding the blue variant since it's a staple
		palette: {
			mode: "light",
			primary: { main: "#000080" }, // Deep blue for links
			secondary: { main: "#789922" }, // Greentext remains the same
			background: {
				default: "#eef2ff", // Light blue page background
				paper: "#d6daf0", // Muted blue for post containers
			},
			text: {
				primary: "#0f0c5d",
				secondary: "#000000",
			},
			divider: "#b7c5d9",
		},
	},

	tomorrow: {
		palette: {
			mode: "dark",
			primary: { main: "#5F89AC" },
			secondary: { main: "#b5bd68" },
			background: { default: "#1d1f21", paper: "#282a2e" },
			text: {
				primary: "#c5c8c6",
				secondary: "#969896",
			},
			divider: "#282a2e",
		},
	},

	dracula: {
		palette: {
			mode: "dark",
			primary: { main: "#bd93f9" }, // Purple
			secondary: { main: "#50fa7b" }, // Green (Greentext)
			error: { main: "#ff5555" }, // Red
			background: {
				default: "#282a36",
				paper: "#44475a",
			},
			text: {
				primary: "#f8f8f2",
				secondary: "#6272a4", // Muted bluish-grey for metadata
			},
			divider: "#6272a4",
		},
	},
};

export const buildTheme = (variant: ThemeVariant) => {
	const selectedPalette = themeOptions[variant] || themeOptions.tomorrow;

	// createTheme can take multiple objects; it merges them left to right
	const theme = createTheme(baseOptions, selectedPalette);

	return responsiveFontSizes(theme);
};

export const themeNames = Object.keys(themeOptions) as ThemeVariant[];
