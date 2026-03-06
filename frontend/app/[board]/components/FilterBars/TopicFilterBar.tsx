"use client";
import { Box, Button, Typography, TextField, InputAdornment } from "@mui/material";
import { List, GridView, SearchOutlined } from "@mui/icons-material";
import FilterBar from "./FilterBar";
import StyledLink from "@/app/components/StyledLink";
import Link from "next/link";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import { useAutoRefresh } from "@/app/hooks/useAutoRefresh";
import { usePrefsContext } from "@/app/utils/UserPrefContext";

export default function TopicFilterBar({ board, topicId }: { board: string; topicId: number }) {
	const { open } = usePostFormContext();
	const { prefs } = usePrefsContext();
	const countdown = useAutoRefresh(prefs.refreshInterval);

	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
				<Button variant='outlined' LinkComponent={Link} href={`/${board}`} startIcon={<List />} size='small'>
					Index
				</Button>
				<Button variant='outlined' LinkComponent={Link} href={`/${board}/catalog`} startIcon={<GridView />} size='small'>
					Catalog
				</Button>
				<TextField
					size='small'
					label='Search...'
					sx={{ flex: 1, mr: { xs: 2, s: 5, md: 20 } }}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<SearchOutlined sx={{ color: "text.primary" }} />
								</InputAdornment>
							),
						},
					}}
				/>
			</Box>
			<Box sx={{ mx: 2, opacity: 0.3 }}>
				<Typography>{countdown}</Typography>
			</Box>
			<Box>
				<Button variant='contained' onClick={() => open("reply", board, topicId)}>
					Create Reply
				</Button>
			</Box>
		</FilterBar>
	);
}
