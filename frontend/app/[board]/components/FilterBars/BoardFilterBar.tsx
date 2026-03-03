"use client";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import StyledLink from "@/app/components/StyledLink";
import { usePrefsContext } from "@/app/utils/UserPrefContext";
import FilterBar from "./FilterBar";

export default function BoardFilterBar() {
	const { prefs, setPreference } = usePrefsContext();

	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2 }}>
				<StyledLink href='/'>Index</StyledLink>
				<StyledLink href='/'>Catalog</StyledLink>
				<TextField size='small' label='Search' />
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Button sx={{ minWidth: 135 }} variant='contained'>
					Create Thread
				</Button>
				<Select
					sx={{ minWidth: 135 }}
					size='small'
					value={prefs.sortOrder}
					onChange={(e) => setPreference("sortOrder", e.target.value as "bumpOrder" | "newest" | "oldest" | "mostPosts")}>
					<MenuItem value='bumpOrder'>Bump Order</MenuItem>
					<MenuItem value='newest'>Newest</MenuItem>
					<MenuItem value='oldest'>Oldest</MenuItem>
					<MenuItem value='mostPosts'>Most Posts</MenuItem>
				</Select>
			</Box>
		</FilterBar>
	);
}
