import { Box, Typography, IconButton, Divider } from "@mui/material";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import LockIcon from "@mui/icons-material/Lock";
import StyledLink from "@/app/components/StyledLink";
import PostCard from "./PostCard";
import TopicMenu from "./TopicMenu";
import type { Topic } from "@/app/types/topics";
import { formatPostContent } from "@/app/utils/textFormatter";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	const [firstPost, ...replies] = topic.posts;
	const previewReplies = replies.slice(0, 5);
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	return (
		<>
			<Box sx={{ p: 3, my: 3, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
				{/* OP */}
				<Box sx={{ display: "flex", gap: 3, position: "relative" }}>
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

					<Box sx={{ flex: 1 }}>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
							<Typography variant='h6' component='h2' sx={{ fontWeight: 600 }}>
								{topic.subject}
							</Typography>
							<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
								{/* Pinned And Locked Icons */}
								{topic.isPinned && <PushPinIcon sx={{ fontSize: 20, color: "text.secondary" }} />}
								{topic.isLocked && <LockIcon sx={{ fontSize: 20, color: "text.secondary" }} />}
							</Box>
							<TopicMenu />
						</Box>

						<Typography variant='body2' sx={{ color: "text.secondary", mb: 1 }}>
							{firstPost?.name || "Anonymous"} - {new Date(topic.createdAt).toLocaleString()} - No.{firstPost.id}
						</Typography>

						<Box sx={{ mb: 2, flex: 1 }}>{formatPostContent(firstPost?.content)}</Box>

						<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
							<Typography variant='body2' sx={{ color: "text.secondary" }}>
								{replies.length} replies
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

				{/* Reply previews */}
				{previewReplies.length > 0 && (
					<Box sx={{ mt: 2, ml: 3, display: "flex", flexDirection: "column", gap: 1 }}>
						{previewReplies.map((post) => (
							<PostCard key={post.id} post={post} backendUrl={backendUrl} />
						))}
					</Box>
				)}
			</Box>

			<Divider />
		</>
	);
}
