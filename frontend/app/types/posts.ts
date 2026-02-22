import type { ImageData } from "./imageData";

export interface Post {
	id: number;
	topicId: number;
	userId: number | null;
	name: string;
	content: string;
	imageDataId: number | null;
	imageData: ImageData | null;
	isDeleted: boolean;
	createdAt: string;
	topic: null;
}
