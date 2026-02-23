"use client";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";
import { usePostFormContext } from "@/app/utils/PostFormContext";

const DRAWER_WIDTH = 400;

export default function PostFormDrawer() {
	const { isOpen, close } = usePostFormContext();

	return (
		<Drawer
			variant='persistent'
			anchor='right'
			open={isOpen}
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
					p: 2,
				},
			}}></Drawer>
	);
}
