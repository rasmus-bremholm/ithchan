import getTopicsOnBoard from "@/app/actions/getTopicsOnBoard";
import TopicCard from "./TopicCard";

interface TopicListProps {
	board: string;
}

export default async function TopicList({ board }: TopicListProps) {
	// This component is responsiable for fetching and rendering topics on the server.
	const topics = await getTopicsOnBoard(board);

	{
		/* Here we need to handle topic sorting, and hidden topics */
	}
	const sortedTopics = topics.sort((a, b) => {
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;
		return new Date(b.lastBumpedAt).getTime() - new Date(a.lastBumpedAt).getTime();
	});

	console.log(sortedTopics);

	return (
		<>
			{sortedTopics.map((topic) => (
				<TopicCard key={topic.id} topic={topic} />
			))}
		</>
	);
}
