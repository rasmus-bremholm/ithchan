"use client";
import { IconButton, Modal, Box, Typography, Divider, Switch, FormGroup, FormControlLabel, Slider, Select, MenuItem } from "@mui/material";
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
						p: 3,
						borderRadius: 1,
					}}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography variant='h5' sx={{ flex: 1 }}>
							Preferences
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon sx={{ color: "text.secondary" }} />
						</IconButton>
					</Box>
					<Divider sx={{ my: 3 }} />
					<Box>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<Typography variant='h6'>Images</Typography>

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography>Expand images on hover</Typography>
								<Switch checked={prefs.hoverExpandImages} onChange={(e) => setPreference("hoverExpandImages", e.target.checked)} />
							</Box>

							<Box>
								<Typography>Hover image scale: {prefs.hoverScaleFactor}</Typography>
								<Slider
									min={0.3}
									max={1}
									step={0.1}
									value={prefs.hoverScaleFactor}
									onChange={(_, value) => setPreference("hoverScaleFactor", value as number)}
								/>
							</Box>
							<Divider />
							<Typography variant='h6'>Thread Behaviour</Typography>
							<Box>
								<Typography>Default sorting order</Typography>
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
					</Box>
				</Box>
			</Modal>
		</>
	);
}
