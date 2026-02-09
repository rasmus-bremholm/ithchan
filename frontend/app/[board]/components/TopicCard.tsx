import { Box, Typography, IconButton, Divider } from "@mui/material";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledLink from "@/app/components/StyledLink";
import type { Topic } from "@/app/types/topics";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	const firstPost = topic.posts[0]; // OP
	const previewPosts = topic.posts.slice(1, 3); // Next 2 replies
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	return (
		<>
			<Box sx={{ py: 3 }}>
				{/* Main topic card */}
				<Box sx={{ display: "flex", gap: 3, position: "relative" }}>
					{/* OP Image */}
					{firstPost?.thumbnailPath && (
						<Box sx={{ flexShrink: 0 }}>
							<Image
								src={`${backendUrl}/${firstPost.thumbnailPath}`}
								width={200}
								height={200}
								alt={topic.subject}
								style={{ objectFit: "cover", borderRadius: 8 }}
							/>
						</Box>
					)}

					{/* OP Content */}
					<Box sx={{ flex: 1 }}>
						{/* Subject line + metadata */}
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
							<Typography variant='h6' component='h2' sx={{ fontWeight: 600 }}>
								{topic.subject}
							</Typography>

							{/* Kebab menu */}
							<IconButton size='small' sx={{ mt: -1 }}>
								<MoreVertIcon />
							</IconButton>
						</Box>

						{/* Metadata */}
						<Typography variant='body2' sx={{ color: "text.secondary", mb: 1 }}>
							{firstPost?.name || "Anonymous"} • {new Date(topic.createdAt).toLocaleString()} • No.{topic.id}
						</Typography>

						{/* OP post content */}
						<Typography variant='body1' sx={{ mb: 2 }}>
							{firstPost?.content}
						</Typography>

						{/* Stats + View Thread link */}
						<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
							<Typography variant='body2' sx={{ color: "text.secondary" }}>
								{topic.posts.length} replies
							</Typography>
							<Typography variant='body2' sx={{ color: "text.secondary" }}>
								{topic.posts.filter((p) => p.imagePath).length} images
							</Typography>
							<StyledLink href={`/${topic.boardName}/${topic.id}`} underline='hover'>
								View Thread
							</StyledLink>
						</Box>
					</Box>
				</Box>

				{/* Preview posts */}
				{previewPosts.length > 0 && (
					<Box sx={{ mt: 2, ml: 3, display: "flex", flexDirection: "column", gap: 1 }}>
						{previewPosts.map((post) => (
							<Box
								key={post.id}
								sx={{
									display: "flex",
									gap: 2,
									p: 2,
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 1,
								}}>
								{/* Reply thumbnail */}
								{post.thumbnailPath && (
									<Box sx={{ flexShrink: 0 }}>
										<Image
											src={`${backendUrl}/${post.thumbnailPath}`}
											width={80}
											height={80}
											alt='reply'
											style={{ objectFit: "cover", borderRadius: 4 }}
										/>
									</Box>
								)}

								{/* Reply content */}
								<Box>
									<Typography variant='body2' sx={{ color: "text.secondary", mb: 0.5 }}>
										{post.name} • No.{post.id}
									</Typography>
									<Typography variant='body2'>{post.content}</Typography>
								</Box>
							</Box>
						))}
					</Box>
				)}
			</Box>

			<Divider />
		</>
	);
}
