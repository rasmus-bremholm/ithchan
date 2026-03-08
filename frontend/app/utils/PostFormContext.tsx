"use client";
import React, { createContext, useContext, useState } from "react";

type PostFormMode = "reply" | "newTopic";

type PostFormContextType = {
	isOpen: boolean;
	content: string;
	mode: PostFormMode;
	board: string | null;
	topicId: number | null;
	quotedPostId: number | null;
	open: (mode: PostFormMode, board: string, topicId?: number, quotedPostId?: number) => void;
	close: () => void;
	setContent: React.Dispatch<React.SetStateAction<string>>;
};

const PostFormContext = createContext<PostFormContextType | undefined>(undefined);

export function PostFormContextProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useState<PostFormMode>("reply");
	const [board, setBoard] = useState<string | null>(null);
	const [topicId, setTopicId] = useState<number | null>(null);
	const [quotedPostId, setQuotedPostId] = useState<number | null>(null);
	const [content, setContent] = useState("");

	const open = (mode: PostFormMode, board: string, topicId?: number, quotedPostId?: number) => {
		setMode(mode);
		setBoard(board);
		setTopicId(topicId ?? null);
		setQuotedPostId(quotedPostId ?? null);
		if (quotedPostId) setContent((prev) => prev + `>>${quotedPostId}\n`);
		setIsOpen(true);
	};

	const close = () => {
		setIsOpen(false);
		setQuotedPostId(null);
		setTopicId(null);
		setBoard(null);
		setContent("");
	};

	return (
		<PostFormContext.Provider value={{ content, isOpen, mode, board, topicId, quotedPostId, open, close, setContent }}>{children}</PostFormContext.Provider>
	);
}

export const usePostFormContext = () => {
	const context = useContext(PostFormContext);
	if (!context) throw new Error("usePostFormContext must be used within PostFormContextProvider");
	return context;
};
