import { Box, Typography } from "@mui/material";
import Image from "next/image";
import HoverImage from "@/app/components/HoverImage";
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
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
			}}>
			{post.imageData && (
				<Box sx={{ flexShrink: 0 }}>
					<HoverImage
						thumbNailPath={`${backendUrl}/${post.imageData.thumbNailPath}`}
						imagePath={`${backendUrl}/${post.imageData.imagePath}`}
						alt='reply'
						width={100}
						height={100}
						orgWidth={post.imageData.imageWidth}
						orgHeight={post.imageData.imageHeight}
						borderRadius={4}
					/>
				</Box>
			)}

			<Box sx={{ mx: 1 }}>
				<Typography variant='body2' sx={{ color: "text.secondary", mb: 0.5 }}>
					{post.name} No.{post.id}
				</Typography>
				<Box sx={{ mt: 1 }}>{formatPostContent(post.content)}</Box>
			</Box>
		</Box>
	);
}
