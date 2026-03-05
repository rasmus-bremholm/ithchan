import { Container, Typography, Box, Link as MuiLink, Grid } from "@mui/material";
import getAllBoards from "./actions/getAllBoards";
import StyledLink from "./components/StyledLink";
import { getStats } from "./actions/getStats";
import CatalogCard from "./components/CatalogCard";

export default async function Home() {
	const boards = await getAllBoards();
	const stats = await getStats();

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
					<Box sx={{ display: "flex", p: 2, gap: 2 }}>
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
				<Box>
					<Box sx={{ bgcolor: "background.paper" }}>
						<Typography sx={{ px: 2, py: 1 }} variant='h4'>
							Stats
						</Typography>
					</Box>
					<Box sx={{ display: "flex", gap: 2, px: 2 }}>
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
