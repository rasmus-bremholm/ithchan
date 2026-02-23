"use client";
import { Box, Button } from "@mui/material";
import FilterBar from "./FilterBar";
import StyledLink from "@/app/components/StyledLink";

export default function TopicFilterBar({ board }: { board: string }) {
	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2 }}>
				<StyledLink href={`/${board}/`}>Index</StyledLink>
				<StyledLink href='/'>Catalog</StyledLink>
			</Box>
			<Box>
				<Button variant='contained'>Create Reply</Button>
			</Box>
		</FilterBar>
	);
}
