import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import getAllBoards from "./actions/getAllBoards";
import getTopicsOnBoard from "./actions/getTopicsOnBoard";
import Link from "next/link";
import StyledLink from "./components/StyledLink";

export default async function Home() {
	const boards = await getAllBoards();
	const topics = await getTopicsOnBoard("v");
	console.log(topics);

	return (
		<Container>
			<Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
				<Typography variant='h1'>ITHCHAN</Typography>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box>
					<Box sx={{ bgcolor: "background.paper" }}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Boards
						</Typography>
					</Box>

					<Box sx={{ px: 2 }}>
						{boards &&
							boards.map((board) => (
								<StyledLink key={board.name} href={`/${board.name}/`} color='primary'>
									<Typography>
										{board.name} - {board.title}
									</Typography>
								</StyledLink>
							))}
					</Box>
				</Box>
				<Box sx={{ bgcolor: "background.paper" }}>
					<Typography sx={{ px: 2, py: 1 }} variant='h4'>
						Popular Threads
					</Typography>
				</Box>
				<Box>
					<Box sx={{ bgcolor: "background.paper" }}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Stats
						</Typography>
					</Box>
					<Box sx={{ display: "flex", gap: 2, px: 2 }}>
						<Typography>Total Posts: </Typography>
						<Typography>Current Users: </Typography>
						<Typography>Active Content: </Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
