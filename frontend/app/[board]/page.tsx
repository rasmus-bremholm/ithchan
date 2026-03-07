import { Container, Typography, Box } from "@mui/material";
import getBoard from "../actions/getBoard";
import TopicList from "./components/TopicList";
import { Suspense } from "react";
import TopicListSkeleton from "../components/skeletons/TopicListSkeleton";
import BoardFilterBar from "./components/FilterBars/BoardFilterBar";
import PostFormDrawer from "../components/posts/PostsFormDrawer";
import Banner from "../components/Banners";

type Params = Promise<{ board: string }>;

export default async function BoardPage({ params }: { params: Params }) {
	const pageParam = await params;
	const currentBoard = await getBoard(pageParam.board);

	return (
		<Container>
			<Box sx={{ mt: 6 }}>
				<Box sx={{ display: "flex", border: "1px solid", borderColor: "divider", borderRadius: 1, py: 3, px: 4, gap: 2 }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography variant='h1' component='span'>
							/{currentBoard.name}/
						</Typography>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
						<Typography variant='h2' component='h1' sx={{ fontWeight: 700 }}>
							{currentBoard.title}
						</Typography>
						<Typography variant='body1'>{currentBoard.description}</Typography>
					</Box>
					<Banner board={currentBoard.name} />
				</Box>
				<BoardFilterBar board={currentBoard.name} />
				<PostFormDrawer />
				<Suspense fallback={<TopicListSkeleton />}>
					<TopicList board={currentBoard.name} />
				</Suspense>
			</Box>
		</Container>
	);
}
