"use client";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState, MouseEvent } from "react";

export default function TopicMenu() {
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorElement);

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
				<MenuItem>Hide Thread</MenuItem>
				<MenuItem>Report Thread</MenuItem>
			</Menu>
		</>
	);
}
