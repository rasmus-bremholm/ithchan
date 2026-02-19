import TopicCardSkeleton from "./TopicCardSkeleton";

export default function TopicListSkeleton() {
	return (
		<>
			{[1, 2, 3, 4, 5].map((i) => (
				<TopicCardSkeleton key={i} />
			))}
		</>
	);
}
