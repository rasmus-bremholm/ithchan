import getTopicsOnBoard from "@/app/actions/getTopicsOnBoard";
import TopicCard from "./TopicCard";
import TopicListClient from "./TopicsListClient";

interface TopicListProps {
	board: string;
	variant?: "list" | "catalog";
}

export default async function TopicList({ board, variant = "list" }: TopicListProps) {
	// This component is responsiable for fetching and rendering topics on the server.
	// We now moved the sorting to a client component. TopicListClient that only handles sorting.
	const topics = await getTopicsOnBoard(board);

	return <TopicListClient topics={topics} variant={variant} />;
}
