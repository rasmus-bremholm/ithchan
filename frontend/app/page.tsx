"use server";
import { Container, Typography, Box, Link as MuiLink, Grid } from "@mui/material";
import getAllBoards from "./actions/getAllBoards";
import StyledLink from "./components/StyledLink";
import { getStats } from "./actions/getStats";
import CatalogCard from "./components/CatalogCard";

const titleBarSx = {
	bgcolor: "background.paper",
	borderRadius: 1,
	border: "1px solid",
	borderColor: "divider",
};

const container = {
	border: "1px solid",
	borderColor: "divider",
	p: 1,
	borderRadius: 1,
};

export default async function Home() {
	const boards = await getAllBoards();
	const stats = await getStats();

	const sortedBoards = boards.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Container>
			<Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
				<Typography variant='h1'>ITHCHAN</Typography>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={container}>
					<Box sx={titleBarSx}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Boards
						</Typography>
					</Box>

					<Box sx={{ px: 2, my: 1 }}>
						{boards &&
							sortedBoards.map((board) => (
								<StyledLink key={board.name} href={`/${board.name}/`} color='primary'>
									<Typography>
										/{board.name}/ - {board.title}
									</Typography>
								</StyledLink>
							))}
					</Box>
				</Box>
				<Box sx={container}>
					<Box sx={titleBarSx}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Popular Threads
						</Typography>
					</Box>

					<Box sx={{ display: "flex", py: 1, my: 1, gap: 2, bgcolor: "background.default" }}>
						{stats.popularTopics.map((topic) => (
							<CatalogCard
								key={topic.id}
								subject={topic.subject}
								boardName={topic.boardName}
								topicId={topic.id}
								thumbNailPath={topic.posts[0].imageData?.thumbNailPath || undefined}
							/>
						))}
					</Box>
				</Box>
				<Box sx={container}>
					<Box sx={titleBarSx}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Stats
						</Typography>
					</Box>
					<Box sx={{ display: "flex", gap: 2, px: 2, my: 1, bgcolor: "background.default" }}>
						<Typography>Total Posts: {stats.totalPosts}</Typography>
						{/*
						<Typography>Current Users: </Typography>
						<Typography>Active Content: </Typography>
						*/}
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
