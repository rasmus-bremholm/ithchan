import { Container, Typography, Box } from "@mui/material";
import getBoard from "../actions/getBoard";
import type { Board } from "../types/boards";

type Params = Promise<{ board: string }>;

export default async function BoardPage({ params }: { params: Params }) {
	const pageParam = await params;
	const currentBoard = await getBoard(pageParam.board);

	console.log(`Page Param: ${pageParam.board}`);
	console.log(`Current Board Info: ${currentBoard}`);

	return (
		<Container>
			<Box>
				<Box>
					<Typography variant='h1'>/{currentBoard.name}/</Typography>
					<Typography variant='h4'>{currentBoard.title}</Typography>
					<Typography variant='body1'>{currentBoard.description}</Typography>
				</Box>
			</Box>
		</Container>
	);
}
