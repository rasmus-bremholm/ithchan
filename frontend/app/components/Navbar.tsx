import { Box, Typography, Stack, Container } from "@mui/material";
import StyledLink from "./StyledLink";
import getAllBoards from "../actions/getAllBoards";

export default async function Navbar() {
	const boards = await getAllBoards();

	return (
		<Container component='nav' sx={{ display: "flex", py: 1 }}>
			<Stack direction='row' sx={{ gap: 1 }}>
				[<StyledLink href={"/"}>Index</StyledLink>
				<StyledLink href={"/"}>Archive</StyledLink>]
			</Stack>
			<Stack direction='row' sx={{ flex: 1, gap: 1, mx: 1 }}>
				{boards.map((board) => (
					<StyledLink key={board.title} href={`/${board.name}`}>
						/{board.name}/
					</StyledLink>
				))}
			</Stack>
		</Container>
	);
}
