import { Container, Box, Typography, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTopicWithPosts } from "@/app/actions/getTopicWithPosts";
import { formatPostContent } from "@/app/utils/textFormatter";
import PostCard from "../components/PostCard";
import Image from "next/image";

type Params = Promise<{ board: string; topic: string }>;

export default async function TopicPage({ params }: { params: Params }) {
	const { board, topic } = await params;
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	try {
		const topicData = await getTopicWithPosts(board, parseInt(topic));
		const replies = topicData.posts.slice(1);

		return (
			<Container>
				<Box sx={{ p: 3, my: 3 }}>
					{/* OP */}
					<Box sx={{ display: "flex", gap: 3, position: "relative" }}>
						<Box sx={{ flexShrink: 0 }}>
							<Image
								src={`${backendUrl}/${topicData.posts[0].imagePath}`}
								width={300}
								height={300}
								alt={topicData.subject}
								style={{ objectFit: "cover", borderRadius: 8 }}
							/>
						</Box>

						<Box sx={{ flex: 1 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
								<Typography variant='h6' component='h1' sx={{ fontWeight: 600 }}>
									{topicData.subject}
								</Typography>
								<IconButton size='small' sx={{ mt: -1 }}>
									<MoreVert sx={{ color: "text.secondary" }} />
								</IconButton>
							</Box>
							<Typography variant='body2' sx={{ color: "text.secondary", mb: 1 }}>
								{topicData.posts[0].name} - {new Date(topicData.createdAt).toLocaleString()} - No.{topicData.id}
							</Typography>

							<Box sx={{ mb: 2, flex: 1 }}>{formatPostContent(topicData.posts[0].content)}</Box>
						</Box>
						{/* Replies */}
					</Box>
					<Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
						{replies.map((post) => (
							<PostCard key={post.id} post={post} backendUrl={backendUrl} />
						))}
					</Box>
				</Box>
			</Container>
		);
	} catch (error) {
		notFound();
	}
}
