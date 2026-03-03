"use server";
import { revalidatePath } from "next/cache";

export async function postReply(board: string, topicId: number, formData: FormData) {
	const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const url = `${backendUrl}/boards/${board}/topics/${topicId}/reply`;

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	console.log("Posting to ", url);
	console.log("Status ", response.status);

	if (!response.ok) {
		const error = await response.text();
		console.log(error);

		throw new Error("Failed to post reply");
	}

	revalidatePath(`/${board}/${topicId}`);

	return await response.json();
}
