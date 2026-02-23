import { Box } from "@mui/material";

export default function FilterBar({ children }: { children: React.ReactNode }) {
	return (
		<Box component='nav' sx={{ display: "flex", alignItems: "center", my: 2 }}>
			{children}
		</Box>
	);
}
