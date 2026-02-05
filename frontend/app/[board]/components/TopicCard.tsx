import { Topic } from "@/app/types/topics";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	const firstPost = topic.posts[0];
	console.log(firstPost.name);

	//{firstPost.thumbnailPath && <Image src={`http://localhost:5041/uploads/${firstPost.thumbnailPath}`} height={100} width={150} alt='' />}

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<Box>
					<Typography>{topic.subject}</Typography>
				</Box>
			</Box>
			<Divider />
		</>
	);
}
