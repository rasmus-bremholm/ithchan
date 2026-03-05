import type { Topic } from "./topics";

export interface Stats {
	popularTopics: Topic[];
	totalPosts: number;
}

export interface test {
	boardName: string;
	topicId: number;
	subject: string;
	thumbNailPath: string | null;
	replyCount?: number;
}
