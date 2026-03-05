"use server";

import type { Stats } from "../types/stats";

export async function getStats() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");

	const response = await fetch(`${baseUrl}/stats`, {
		next: { revalidate: 120 },
	});

	if (!response.ok) {
		throw new Error(`Stats is not avalible: ${response.status}`);
	}

	const result: Stats = await response.json();

	return result;
}
