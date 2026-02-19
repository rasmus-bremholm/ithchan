"use client";

import { IconButton, Menu, MenuItem, Divider, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState, MouseEvent } from "react";

export default function TopicMenu() {
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorElement);
	const isAdmin = true;

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorElement(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElement(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreVert sx={{ color: "text.secondary" }} />
			</IconButton>

			<Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Hide Thread</MenuItem>
				<MenuItem onClick={handleClose}>Report Thread</MenuItem>
				{isAdmin && [
					<Divider key='divider' flexItem orientation='horizontal' sx={{ my: 1, borderColor: "text.secondary", opacity: 0.3 }} />,
					<MenuItem key='pin' onClick={handleClose}>
						Pin Thread
					</MenuItem>,
					<MenuItem key='lock' onClick={handleClose}>
						Lock Thread
					</MenuItem>,
					<MenuItem key='delete' onClick={handleClose}>
						Delete Thread
					</MenuItem>,
				]}
			</Menu>
		</>
	);
}
