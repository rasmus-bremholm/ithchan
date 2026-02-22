"use client";
import { IconButton, Modal, Box, Typography, Divider, Switch, FormGroup, FormControlLabel } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { usePrefsContext } from "../utils/UserPrefContext";
import { useState } from "react";

export default function OptionsButton() {
	const { prefs, setPreference } = usePrefsContext();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<IconButton onClick={handleOpen}>
				<SettingsIcon sx={{ color: "text.secondary", fontSize: 20 }} />
			</IconButton>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						position: "absolute",
						top: "20%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 600,
						bgcolor: "background.paper",
						p: 2,
					}}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography variant='h5' sx={{ flex: 1 }}>
							Preferences
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon sx={{ color: "text.secondary" }} />
						</IconButton>
					</Box>
					<Divider />
					<Box>
						<Typography variant='h6'>Images</Typography>
						<FormGroup>
							<FormControlLabel
								control={<Switch checked={prefs.hoverExpandImages} onChange={(e) => setPreference("hoverExpandImages", e.target.checked)} />}
								label='Expand Images on Hover'
							/>
						</FormGroup>
					</Box>
				</Box>
			</Modal>
		</>
	);
}
