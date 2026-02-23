"use client";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import StyledLink from "@/app/components/StyledLink";
import { usePrefsContext } from "@/app/utils/UserPrefContext";

export default function TopicsFilterBar() {
	const { prefs, setPreference } = usePrefsContext();

	return (
		<Box component='nav' sx={{ display: "flex", alignItems: "center", my: 2 }}>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2 }}>
				<StyledLink href='/'>Index</StyledLink>
				<StyledLink href='/'>Catalog</StyledLink>
				<TextField size='small' label='Search' />
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Select
					size='small'
					value={prefs.sortOrder}
					onChange={(e) => setPreference("sortOrder", e.target.value as "bumpOrder" | "newest" | "oldest" | "mostPosts")}>
					<MenuItem value='bumpOrder'>Bump Order</MenuItem>
					<MenuItem value='newest'>Newest</MenuItem>
					<MenuItem value='oldest'>Oldest</MenuItem>
					<MenuItem value='mostPosts'>Most Posts</MenuItem>
				</Select>
			</Box>
		</Box>
	);
}
