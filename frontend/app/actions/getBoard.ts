"use server";
import type { Board } from "../types/boards";

export default async function getBoard(board: string) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

	const response = await fetch(`${baseUrl}/boards/${board}`, {
		next: { revalidate: 120 },
	});

	if (!response.ok) {
		throw new Error(`getAllBoards Error: ${response.status}`);
	}

	const result: Board = await response.json();

	return result;
}
