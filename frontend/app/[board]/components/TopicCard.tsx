import { Box, Typography, IconButton, Divider } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import LockIcon from "@mui/icons-material/Lock";
import StyledLink from "@/app/components/StyledLink";
import HoverImage from "@/app/components/HoverImage";
import PostCard from "./PostCard";
import TopicMenu from "./TopicMenu";
import type { Topic } from "@/app/types/topics";
import { formatPostContent } from "@/app/utils/textFormatter";
import PostNumber from "@/app/components/posts/PostNumber";

interface TopicCardProps {
	topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
	const [firstPost, ...replies] = topic.posts;
	const previewReplies = replies.slice(0, 5);
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	return (
		<>
			<Box sx={{ p: 3, my: 3 }}>
				{/* OP */}
				<Box
					sx={{
						display: "flex",
						gap: 3,
						position: "relative",
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 1,
						p: 2,
						bgcolor: "background.paper",
						boxShadow: 3,
						mb: 2,
					}}>
					{firstPost?.imageData && (
						<Box sx={{ flexShrink: 0 }}>
							<HoverImage
								thumbNailPath={`${backendUrl}/${firstPost.imageData.thumbNailPath}`}
								imagePath={`${backendUrl}/${firstPost.imageData.imagePath}`}
								width={200}
								height={200}
								orgWidth={firstPost.imageData.imageWidth}
								orgHeight={firstPost.imageData.imageHeight}
								alt={topic.subject}
								borderRadius={8}
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
							{firstPost?.name || "Anonymous"} - {new Date(topic.createdAt).toLocaleString()} -{" "}
							<PostNumber topicId={topic.id} board={topic.boardName} postId={firstPost.id} />
						</Typography>

						<Box sx={{ mb: 2, flex: 1 }}>{formatPostContent(firstPost?.content)}</Box>

						<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
							<Typography variant='body2' sx={{ color: "text.secondary" }}>
								{replies.length} replies
							</Typography>
							<Typography variant='body2' sx={{ color: "text.secondary" }}>
								{topic.posts.filter((p) => p.imageData?.imageSize).length} images
							</Typography>

							<StyledLink href={`/${topic.boardName}/${topic.id}`} underline='hover'>
								View Thread
							</StyledLink>
						</Box>
					</Box>
				</Box>

				{/* Reply previews */}
				{previewReplies.length > 0 && (
					<Box sx={{ mt: 1, mx: 3 }}>
						{previewReplies.map((post, index) => {
							const isLast = index === previewReplies.length - 1;
							return (
								<Box
									key={post.id}
									sx={{
										position: "relative",
										pl: 3,
										pb: isLast ? 0 : 2,
										borderLeft: isLast ? "none" : "1px solid",
										borderColor: "divider",
										"&::before": {
											content: '""',
											position: "absolute",
											left: 0,
											top: isLast ? 0 : 30,
											width: 20,
											borderBottom: "1px solid",
											borderLeft: isLast ? "1px solid" : "none",
											borderColor: "divider",
											height: isLast ? 30 : 0,
											borderBottomLeftRadius: isLast ? 8 : 0,
										},
									}}>
									<PostCard post={post} backendUrl={backendUrl} board={topic.boardName} topicId={topic.id} />
								</Box>
							);
						})}
					</Box>
				)}
			</Box>

			<Divider />
		</>
	);
}
