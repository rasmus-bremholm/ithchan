import { Container, Typography, Box } from "@mui/material";
import getAllBoards from "./actions/getAllBoards";

export default async function Home() {
	const boards = await getAllBoards();

	return (
		<Container>
			<Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
				<Typography variant='h1'>ITHCHAN</Typography>
				<Box>
					<Typography variant='h4'>Boards</Typography>
					<Box>{boards && boards.map((board) => <Typography key={board.Name}>{board.Name}</Typography>)}</Box>
				</Box>
				<Box>
					<Typography variant='h4'>Popular Threads</Typography>
				</Box>
				<Box>
					<Typography variant='h4'>Stats</Typography>
					<Box>
						<Typography>Total Posts: </Typography>
						<Typography>Current Users: </Typography>
						<Typography>Active Content: </Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
