"use server";

import { revalidatePath } from "next/cache";

export async function createTopic(board: string, formData: FormData) {
	const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const url = `${backendUrl}/boards/${board}/topics`;

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const error = await response.text();
		console.log(error);

		throw new Error("Failed to create topic");
	}
	revalidatePath(`/${board}`);
	return await response.json();
}
