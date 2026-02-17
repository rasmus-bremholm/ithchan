import { Box, Typography, Stack } from "@mui/material";
import StyledLink from "./StyledLink";
import getAllBoards from "../actions/getAllBoards";

export default async function Navbar() {
	const boards = await getAllBoards();

	return (
		<Box component='nav' sx={{display: "flex"}}>
			<Stack direction='row'>
				[<StyledLink href={"/"}>Index</StyledLink>
				<StyledLink href={"/"}>Archive</StyledLink>]
			</Stack>
			<Stack direction='row' sx={{ flex: 1 }}>
				{boards.map((board) => (
					<StyledLink key={board.title} href={board.name}>
						/{board.name}/
					</StyledLink>
				))}
			</Stack>
		</Box>
	);
}
