import type { Topic } from "./topics";

export interface Board {
	name: string;
	title: string;
	description: string;
	topics: Topic[];
}
