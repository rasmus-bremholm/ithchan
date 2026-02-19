import { Container, Typography, Box } from "@mui/material";
import getBoard from "../actions/getBoard";
import TopicList from "./components/TopicList";
import { Suspense } from "react";
import TopicListSkeleton from "../components/skeletons/TopicListSkeleton";

type Params = Promise<{ board: string }>;

export default async function BoardPage({ params }: { params: Params }) {
	const pageParam = await params;
	const currentBoard = await getBoard(pageParam.board);

	return (
		<Container>
			<Box sx={{ mt: 6 }}>
				<Box>
					<Typography variant='h1'>/{currentBoard.name}/</Typography>
					<Typography variant='h4'>{currentBoard.title}</Typography>
					<Typography variant='body1'>{currentBoard.description}</Typography>
				</Box>
				<Suspense fallback={<TopicListSkeleton />}>
					<TopicList board={currentBoard.name} />
				</Suspense>
			</Box>
		</Container>
	);
}
