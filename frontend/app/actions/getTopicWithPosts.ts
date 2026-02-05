"use server";

import type { Topic } from "../types/topics";

export async function getTopicWithPosts(board: string, topicId: number) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

	const response = await fetch(`${baseUrl}/boards/${board}/topics/${topicId}`, {
		next: { revalidate: 10 },
	});

	if (!response.ok) {
		throw new Error(`getTopicWithPosts Error: ${response.status}`);
	}

	const result: Topic = await response.json();

	return result;
}
