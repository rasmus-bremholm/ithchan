"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserPrefsType = {
	//Images
	hoverExpandImages: boolean;
	hoverScaleFactor: number;

	//Threads
	hiddenThreads: number[];
	sortOrder: "bumpOrder" | "newest" | "oldest" | "mostPosts";
};

const defaultPrefs: UserPrefsType = {
	hoverExpandImages: true,
	hoverScaleFactor: 0.7,
	hiddenThreads: [],
	sortOrder: "bumpOrder",
};

const UserPrefsContext = createContext<
	{ prefs: UserPrefsType; setPreference: <K extends keyof UserPrefsType>(key: K, value: UserPrefsType[K]) => void } | undefined
>(undefined);

export const UserPrefsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [prefs, setPrefs] = useState<UserPrefsType>(defaultPrefs);

	// Ok im drawing a blank on the use effect. Do I store everything as a big object?
	useEffect(() => {
		const saved = localStorage.getItem("app-user-prefs");
		if (saved) setPrefs({ ...defaultPrefs, ...JSON.parse(saved) });
	}, []);

	const setPreference = <K extends keyof UserPrefsType>(key: K, value: UserPrefsType[K]) => {
		const updated = { ...prefs, [key]: value };
		setPrefs(updated);
		localStorage.setItem("app-user-prefs", JSON.stringify(updated));
	};

	return <UserPrefsContext value={{ prefs, setPreference }}>{children}</UserPrefsContext>;
};

export const usePrefsContext = () => {
	const context = useContext(UserPrefsContext);
	if (!context) throw new Error("usePrefsContext must be used withing UserPrefsContext");
	return context;
};
