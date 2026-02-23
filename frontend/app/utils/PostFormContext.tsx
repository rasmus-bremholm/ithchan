"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type PostFormContextType = {
	isOpen: boolean;
	quotedPostId: number | null;
	open: (quotedPostId?: number) => void;
	close: () => void;
};

const PostFormContext = createContext<PostFormContextType | undefined>(undefined);

export function PostFormContextProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [quotedPostId, setQuotedPostId] = useState<number | null>(null);

	const open = (quotedPostId?: number) => {
		setQuotedPostId(quotedPostId ?? null);
		setIsOpen(true);
	};

	const close = () => {
		setIsOpen(false);
		setQuotedPostId(null);
	};

	return <PostFormContext.Provider value={{ isOpen, quotedPostId, open, close }}>{children}</PostFormContext.Provider>;
}

export const usePostFormContext = () => {
	const context = useContext(PostFormContext);
	if (!context) throw new Error("usePostFormContext must be used withing PostFormContextProvider");
	return context;
};
