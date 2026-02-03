"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { buildTheme } from "./theme"; // Note: Importing the function, not the object
import { ThemeContextProvider, useThemeContext } from "./ThemeContext";
import { useMemo } from "react";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const { currentTheme } = useThemeContext();

	const theme = useMemo(() => buildTheme(currentTheme), [currentTheme]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
	return (
		<AppRouterCacheProvider>
			<ThemeContextProvider>
				<ThemeWrapper>{children}</ThemeWrapper>
			</ThemeContextProvider>
		</AppRouterCacheProvider>
	);
}
