import getTopicsOnBoard from "@/app/actions/getTopicsOnBoard";
import TopicCard from "./TopicCard";

interface TopicListProps {
	board: string;
}

export default async function TopicList({ board }: TopicListProps) {
	// This component is responsiable for fetching and rendering topics on the server.
	const topics = await getTopicsOnBoard(board);
	console.log(topics);

	return (
		<>
			{topics.map((topic) => (
				<TopicCard key={topic.id} topic={topic} />
			))}
		</>
	);
}
