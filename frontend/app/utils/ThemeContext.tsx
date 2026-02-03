"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeVariant } from "./theme";

type ThemeContextType = {
	currentTheme: ThemeVariant;
	setTheme: (name: ThemeVariant) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentTheme, setCurrentTheme] = useState<ThemeVariant>("light");

	useEffect(() => {
		const saved = localStorage.getItem("app-user-theme") as ThemeVariant;
		if (saved) setCurrentTheme(saved);
	}, []);

	const handleThemeChange = (name: ThemeVariant) => {
		setCurrentTheme(name);
		localStorage.setItem("app-user-theme", name);
	};

	return <ThemeContext.Provider value={{ currentTheme, setTheme: handleThemeChange }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useThemeContext must be used within ThemeContextProvider");
	return context;
};
