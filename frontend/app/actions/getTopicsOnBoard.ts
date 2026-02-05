"use server";
import type { Topic } from "../types/topics";

export default async function getTopicsOnBoard(board: string) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

	const response = await fetch(`${baseUrl}/boards/${board}/topics`, {
		next: { revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error(`getTopicsOnBoard Error: ${response.status}`);
	}

	const result: Topic[] = await response.json();

	return result;
}
