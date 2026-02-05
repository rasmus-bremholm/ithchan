export interface Post {
	id: number;
	topicId: number;
	userId: number | null;
	name: string;
	content: string;
	imagePath: string | null;
	thumbnailPath: string | null;
	isDeleted: boolean;
	createdAt: string;
	topic: null;
}
