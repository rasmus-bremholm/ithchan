"use client";
import { Box, Button } from "@mui/material";
import FilterBar from "./FilterBar";
import StyledLink from "@/app/components/StyledLink";
import { usePostFormContext } from "@/app/utils/PostFormContext";

export default function TopicFilterBar({ board }: { board: string }) {
	const { open } = usePostFormContext();

	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2 }}>
				<StyledLink href={`/${board}/`}>Index</StyledLink>
				<StyledLink href='/'>Catalog</StyledLink>
			</Box>
			<Box>
				<Button variant='contained' onClick={() => open()}>
					Create Reply
				</Button>
			</Box>
		</FilterBar>
	);
}
