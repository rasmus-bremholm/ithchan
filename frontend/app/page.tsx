import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import getAllBoards from "./actions/getAllBoards";
import Link from "next/link";
import StyledLink from "./components/StyledLink";

export default async function Home() {
	const boards = await getAllBoards();
	console.log(boards);

	return (
		<Container>
			<Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
				<Typography variant='h1'>ITHCHAN</Typography>
				<Box>
					<Typography variant='h4'>Boards</Typography>
					<Box>
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
				<Box>
					<Typography variant='h4'>Popular Threads</Typography>
				</Box>
				<Box>
					<Typography variant='h4'>Stats</Typography>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Typography>Total Posts: </Typography>
						<Typography>Current Users: </Typography>
						<Typography>Active Content: </Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
