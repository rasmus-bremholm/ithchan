import { Topic } from "@/app/types/topics";
import { Box, Divider, Typography, Link as MuiLink, IconButton } from "@mui/material";
import Image from "next/image";
import { MoreVert } from "@mui/icons-material";
import Link from "next/link";
import StyledLink from "@/app/components/StyledLink";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	if (!topic.posts || topic.posts.length === 0) {
		return null;
	}
	const firstPost = topic.posts[0];
	const preiewPosts = topic.posts.slice(1, 3);
	const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

	//

	return (
		<>
			<Box sx={{ py: 2 }}>
				{/* Main Topic Card */}
				<Box>
					{/* OP Image */}
					{firstPost?.thumbnailPath && (
						<Box sx={{ flexShrink: 0 }}>
							<Image
								src={`${backendUrl}/${firstPost.thumbnailPath}`}
								width={200}
								height={200}
								alt={topic.subject}
								style={{ objectFit: "cover" }}
							/>
						</Box>
					)}
					{/* OP Content */}
					<Box sx={{ flex: 1 }}>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
							<Typography variant='h6' component='h2' sx={{ fontWeight: 600 }}>
								{topic.subject}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Divider sx={{ my: 3 }} />
		</>
	);
}
