import { Topic } from "@/app/types/topics";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import StyledLink from "@/app/components/StyledLink";

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
			{/* OP Post */}
			<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
				{/* Thumbnail */}
				{firstPost.thumbnailPath && (
					<Box sx={{ flexShrink: 0 }}>
						<Image
							src={`http://localhost:5041/${firstPost.thumbnailPath}`}
							height={150}
							width={150}
							alt={topic.subject}
							style={{ objectFit: "cover" }}
						/>
					</Box>
				)}

				{/* OP Content */}
				<Box>
					<Typography variant='subtitle2' color='success.main'>
						{firstPost.name}
					</Typography>
					<Typography variant='h6' sx={{ fontWeight: "bold", my: 1 }}>
						{topic.subject}
					</Typography>
					<Typography variant='body2'>{firstPost.content}</Typography>
				</Box>
			</Box>

			{/* Reply Posts (skip first post, show next 2) */}
			<Box sx={{ ml: 4, borderLeft: "2px solid #444", pl: 2 }}>
				{topic.posts.slice(1, 3).map((post) => (
					<Box key={post.id} sx={{ mb: 1, bgcolor: "#818181" }}>
						<Typography variant='subtitle2' color='success.main'>
							{post.name}
						</Typography>
						<Typography variant='body2'>{post.content}</Typography>
					</Box>
				))}

				<StyledLink href={`/${topic.boardName}/${topic.id}`}>View full thread →</StyledLink>
			</Box>

			<Divider sx={{ my: 3 }} />
		</>
	);
}
