"use client";
import { createTheme, responsiveFontSizes, ThemeOptions, alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		postMeta: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		postMeta?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		postMeta: true;
	}
}

export type ThemeVariant = "yotsuba" | "tomorrow" | "yotsuba_b" | "dracula";

// General Theming

const baseOptions: ThemeOptions = {
	typography: {
		fontFamily: "var(--font-ibm-plex-sans), sans-serif",
		h1: { fontWeight: 800, letterSpacing: "-0.02em" },
		button: { fontWeight: 600, textTransform: "none" },

		body2: {
			fontFamily: "var(--font-jetbrains-mono), monospace",
		},
	},
	shape: {
		borderRadius: 10,
	},
	components: {
		MuiButton: {
			defaultProps: { disableElevation: true },
			styleOverrides: {
				root: { padding: "6px 16px" },
				outlined: ({ theme }) => ({
					borderColor: theme.palette.text.secondary,
					color: theme.palette.text.primary,
				}),
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderColor: alpha(theme.palette.text.primary, 0.1),
					opacity: 1,
					margin: theme.spacing(3, 0),
				}),
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: ({ theme }) => ({
					backgroundImage: "none",
					border: `1px solid ${theme.palette.divider}`,
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.divider,
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: alpha(theme.palette.text.primary, 0.2),
					},
				}),
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
		MuiIconButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					"& .MuiSvgIcon-root": {
						color: theme.palette.text.secondary,
						transition: "color 0.1s",
					},
					"&:hover .MuiSvgIcon-root": {
						color: theme.palette.text.primary,
					},
				}),
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					color: "inherit",
				},
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
			divider: alpha("#d9bfb7", 0.2), // Border color for posts
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
			divider: alpha("#b7c5d9", 0.2),
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
			divider: alpha("#c5c8c6", 0.12),
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
			divider: alpha("#bd93f9", 0.2),
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
