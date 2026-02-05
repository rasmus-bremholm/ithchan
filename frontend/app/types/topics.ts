export interface Topic {
	id: number;
	boardName: string;
	subject: string;
	isLocked: boolean;
	isPinned: boolean;
	createdAt: string;
	lastBumpedAt: string;
	board: null;
	posts: [];
}
