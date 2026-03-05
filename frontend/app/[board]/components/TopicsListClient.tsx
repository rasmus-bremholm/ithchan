"use client";
import type { Topic } from "@/app/types/topics";
import { usePrefsContext } from "@/app/utils/UserPrefContext";
import TopicCard from "./TopicCard";
import CatalogCard from "@/app/components/CatalogCard";
import { Box } from "@mui/material";

interface TopicListClientProps {
	topics: Topic[];
	variant?: "list" | "catalog";
}

export default function TopicListClient({ topics, variant = "list" }: TopicListClientProps) {
	const { prefs } = usePrefsContext();

	const sortedTopics = [...topics].sort((a, b) => {
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;

		if (prefs.sortOrder === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		if (prefs.sortOrder === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

		return new Date(b.lastBumpedAt).getTime() - new Date(a.lastBumpedAt).getTime();
	});

	if (variant === "catalog") {
		return (
			<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
				{sortedTopics.map((topic) => (
					<CatalogCard
						key={topic.id}
						boardName={topic.boardName}
						topicId={topic.id}
						subject={topic.subject}
						thumbNailPath={topic.posts[0]?.imageData?.thumbNailPath}
						replyCount={topic.posts.length - 1}
					/>
				))}
			</Box>
		);
	}

	return sortedTopics.map((topic) => <TopicCard key={topic.id} topic={topic} />);
}
