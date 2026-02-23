"use client";
import type { Topic } from "@/app/types/topics";
import { usePrefsContext } from "@/app/utils/UserPrefContext";
import TopicCard from "./TopicCard";
export default function TopicListClient({ topics }: { topics: Topic[] }) {
	const { prefs } = usePrefsContext();

	const sortedTopics = [...topics].sort((a, b) => {
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;

		if (prefs.sortOrder === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		if (prefs.sortOrder === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

		return new Date(b.lastBumpedAt).getTime() - new Date(a.lastBumpedAt).getTime();
	});

	return sortedTopics.map((topic) => <TopicCard key={topic.id} topic={topic} />);
}
