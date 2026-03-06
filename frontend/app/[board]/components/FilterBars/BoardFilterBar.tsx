"use client";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import StyledLink from "@/app/components/StyledLink";
import { usePrefsContext } from "@/app/utils/UserPrefContext";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import FilterBar from "./FilterBar";
import Link from "next/link";
import { List, GridView } from "@mui/icons-material";

export default function BoardFilterBar({ board }: { board: string }) {
	const { prefs, setPreference } = usePrefsContext();
	const { open } = usePostFormContext();

	return (
		<FilterBar>
			<Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
				<Button variant="outlined" LinkComponent={Link} href={`/${board}`} startIcon={<List/>} size="small">Index</Button>
				<Button variant="outlined" LinkComponent={Link} href={`/${board}/catalog`} startIcon={<GridView/>} size="small">Catalog</Button>
				<TextField size='small' label='Search' />
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Button sx={{ minWidth: 135 }} variant='contained' onClick={() => open("newTopic", board)}>
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
