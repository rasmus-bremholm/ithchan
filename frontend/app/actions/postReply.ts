"use server";

export async function postReply(board: string, topicId: number, formData: FormData) {
	const backendUrl = process.env.BACKEND_URL;

	const response = await fetch(`${backendUrl}/boards/${board}/topics/${topicId}/reply`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Failed to post reply");
	}

	return await response.json();
}
