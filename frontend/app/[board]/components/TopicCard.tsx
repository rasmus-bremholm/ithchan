import { Topic } from "@/app/types/topics";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	if (!topic.posts || topic.posts.length === 0) {
		return null;
	}
	const firstPost = topic.posts[0];
	console.log(firstPost.name);

	//

	return (
		<>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box sx={{ width: 200, height: 200, position: "relative", overflow: "hidden", p: 2 }}>
					{firstPost.thumbnailPath && (
						<Image
							src={`http://localhost:5041/${firstPost.thumbnailPath}`}
							height={200}
							width={200}
							alt={topic.subject}
							style={{ objectFit: "cover", objectPosition: "center" }}
						/>
					)}
				</Box>
				<Box sx={{ p: 2 }}>
					<Typography>{firstPost.name}</Typography>
				</Box>
			</Box>
			<Divider />
		</>
	);
}
