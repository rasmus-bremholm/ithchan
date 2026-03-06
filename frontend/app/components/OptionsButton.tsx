"use client";
import { IconButton, Modal, Box, Typography, Divider, Switch, FormGroup, FormControlLabel, Slider, Select, MenuItem, TextField } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { Close, ImageOutlined, ForumOutlined, ChevronRight } from "@mui/icons-material";
import { usePrefsContext } from "../utils/UserPrefContext";
import { useState } from "react";
import { alpha } from "@mui/material/styles";

export default function OptionsButton() {
	const { prefs, setPreference } = usePrefsContext();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<IconButton onClick={handleOpen}>
				<SettingsOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
			</IconButton>
			<Modal
				aria-labelledby='modal-title'
				open={open}
				onClose={handleClose}
				slotProps={{
					backdrop: {
						sx: {
							backgroundColor: "rgba(0, 0, 0, 0.4)",
							backdropFilter: "blur(4px)",
							WebkitBackdropFilter: "blur(4px)",
						},
					},
				}}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 600,
						bgcolor: "background.default",
						p: 2,
						borderRadius: 1,
						border: "1px solid",
						borderColor: "divider",
					}}>
					{/* MODAL CONTAINER */}
					<Box>
						<Typography variant='h6' id='modal-title'>
							User Preferences
						</Typography>
						{/* FLEX CONTAINER */}
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								p: 2,
								my: 1,
								borderRadius: 1,
								bgcolor: "background.paper",
								border: "1px solid",
								borderColor: "divider",
							}}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<ImageOutlined />
								<Typography variant='h6'>Images</Typography>
							</Box>

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography>Expand images on hover</Typography>
								<Switch checked={prefs.hoverExpandImages} onChange={(e) => setPreference("hoverExpandImages", e.target.checked)} />
							</Box>

							<Box sx={{ px: 1 }}>
								<Typography>Hover image scale:</Typography>
								<Slider
									min={0.3}
									max={1}
									step={0.1}
									value={prefs.hoverScaleFactor}
									marks={[
										{ value: 0.3, label: "0.3" },
										{ value: 0.6, label: "0.6" },
										{ value: 1.0, label: "1.0" },
									]}
									valueLabelDisplay='auto'
									onChange={(_, value) => setPreference("hoverScaleFactor", value as number)}
									sx={{
										"& .MuiSlider-valueLabel": {
											bgcolor: "primary.main",
										},
										"& .MuiSlider-mark": {
											bgcolor: "divider",
											height: 3,
										},
									}}
								/>
							</Box>
							<Divider sx={{ my: 1 }} />
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<ForumOutlined />
								<Typography variant='h6'>Thread Behaviour</Typography>
							</Box>

							<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
								<Typography>Default sorting order:</Typography>
								<Select
									size='small'
									IconComponent={ChevronRight}
									value={prefs.sortOrder}
									onChange={(e) => setPreference("sortOrder", e.target.value as "bumpOrder" | "newest" | "oldest" | "mostPosts")}
									sx={{
										bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
										"& .MuiSelect-icon": {
											transform: "rotate(90deg)",
											color: "text.secondary",
										},
									}}>
									<MenuItem value='bumpOrder'>Bump Order</MenuItem>
									<MenuItem value='newest'>Newest</MenuItem>
									<MenuItem value='oldest'>Oldest</MenuItem>
									<MenuItem value='mostPosts'>Most Posts</MenuItem>
								</Select>
								<Typography>Thread Refresh Interval:</Typography>
								<TextField
									placeholder={`${prefs.refreshInterval}s`}
									type='number'
									size='small'
									sx={{
										bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
										"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
											display: "none",
										},
										"& input[type=number]": {
											MozAppearance: "textfield",
										},
									}}
									onChange={(e) => setPreference("refreshInterval", parseInt(e.target.value))}
								/>
							</Box>
						</Box>
						{/* FLEX CONTAINER END */}
					</Box>
					{/* MODAL CONTAINER END */}
				</Box>
			</Modal>
		</>
	);
}

/*
	{/* MODAL CONTAINER /}
					<Box>
						{/* FLEX CONTAINER /}
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
							<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
								<Typography>Default sorting order:</Typography>
								<Select
									size='small'
									value={prefs.sortOrder}
									onChange={(e) => setPreference("sortOrder", e.target.value as "bumpOrder" | "newest" | "oldest" | "mostPosts")}>
									<MenuItem value='bumpOrder'>Bump Order</MenuItem>
									<MenuItem value='newest'>Newest</MenuItem>
									<MenuItem value='oldest'>Oldest</MenuItem>
									<MenuItem value='mostPosts'>Most Posts</MenuItem>
								</Select>
								<Typography>Thread Refresh Interval:</Typography>
								<TextField
									placeholder={`${prefs.refreshInterval}s`}
									type='number'
									onChange={(e) => setPreference("refreshInterval", parseInt(e.target.value))}
								/>
							</Box>
						</Box>
						{/* FLEX CONTAINER END /}
					</Box>
					{/* MODAL CONTAINER END /}


*/
