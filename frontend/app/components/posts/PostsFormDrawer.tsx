"use client";
import { Drawer, Box, Typography, IconButton, Divider, Icon } from "@mui/material";
import { Close } from "@mui/icons-material";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import PostReplyForm from "./PostReplyForm";
import NewThreadForm from "./NewThreadForm";

const DRAWER_WIDTH = 350;

export default function PostFormDrawer() {
	const { isOpen, close, mode } = usePostFormContext();

	return (
		<Drawer
			variant='persistent'
			anchor='right'
			open={isOpen}
			onClose={close}
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
					p: 2,
					backdropFilter: "blur(8px)",
					borderLeft: "1px solid",
					borderColor: "divider",
				},
			}}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Typography variant='h6' sx={{ flex: 1 }}>
					{mode === "reply" ? "Post Reply" : "Create Thread"}
				</Typography>
				<IconButton onClick={close}>
					<Close />
				</IconButton>
			</Box>
			<Divider sx={{ my: 2 }} />
			{mode === "reply" ?
				<PostReplyForm />
			:	<NewThreadForm />}
			<Divider sx={{ my: 2 }} />
		</Drawer>
	);
}
