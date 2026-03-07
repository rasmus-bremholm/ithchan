import { Stack, Container } from "@mui/material";
import StyledLink from "./StyledLink";
import getAllBoards from "../actions/getAllBoards";
import OptionsButton from "./OptionsButton";

export default async function Navbar() {
	const boards = await getAllBoards();

	const sortedBoards = boards.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Container component='nav' sx={{ display: "flex", py: 1 }}>
			<Stack direction='row' sx={{ gap: 1, fontWeight: 700 }}>
				[<StyledLink href={"/"}>Index</StyledLink>
				<StyledLink href={"/"}>Archive</StyledLink>]
			</Stack>
			<Stack direction='row' sx={{ flex: 1, gap: 1, mx: 1 }}>
				{sortedBoards.map((board) => (
					<StyledLink key={board.title} href={`/${board.name}`}>
						/{board.name}/
					</StyledLink>
				))}
			</Stack>
			<Stack direction='row'>
				<OptionsButton />
			</Stack>
		</Container>
	);
}
