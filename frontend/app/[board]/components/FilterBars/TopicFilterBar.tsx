"use client";
import { Box, Button, Typography } from "@mui/material";
import FilterBar from "./FilterBar";
import StyledLink from "@/app/components/StyledLink";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import { useAutoRefresh } from "@/app/hooks/useAutoRefresh";
import { usePrefsContext } from "@/app/utils/UserPrefContext";

export default function TopicFilterBar({ board, topicId }: { board: string; topicId: number }) {
	const { open } = usePostFormContext();
	const { prefs } = usePrefsContext();
	const countdown = useAutoRefresh(prefs.refreshInterval);

	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2 }}>
				<StyledLink href={`/${board}/`}>Index</StyledLink>
				<StyledLink href={`/${board}/catalog`}>Catalog</StyledLink>
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
