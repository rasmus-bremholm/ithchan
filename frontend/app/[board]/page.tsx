import { Container, Typography, Box } from "@mui/material";
import getBoard from "../actions/getBoard";
import TopicList from "./components/TopicList";

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
				<TopicList board={currentBoard.name} />
			</Box>
		</Container>
	);
}
