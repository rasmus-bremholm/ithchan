import { Box, Typography } from "@mui/material";
import Image from "next/image";
import type { Post } from "@/app/types/posts";
import { formatPostContent } from "@/app/utils/textFormatter";

interface PostCardProps {
	post: Post;
	backendUrl: string | undefined;
}

export default function PostCard({ post, backendUrl }: PostCardProps) {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 2,
				p: 2,
				bgcolor: "background.paper",
				borderRadius: 1,
			}}>
			{post.thumbnailPath && (
				<Box sx={{ flexShrink: 0 }}>
					<Image src={`${backendUrl}/${post.thumbnailPath}`} width={80} height={80} alt='reply' style={{ objectFit: "cover", borderRadius: 4 }} />
				</Box>
			)}

			<Box>
				<Typography variant='body2' sx={{ color: "text.secondary", mb: 0.5 }}>
					{post.name} No.{post.id}
				</Typography>
				{formatPostContent(post.content)}
			</Box>
		</Box>
	);
}
