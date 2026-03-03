"use client";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { usePostFormContext } from "@/app/utils/PostFormContext";

export default function PostReplyForm() {
	const { quotedPostId, close } = usePostFormContext();
	const [name, setName] = useState("");
	const [content, setContent] = useState("");

	// I should probably make a function for inserting the quoted post.
	const initialContent = quotedPostId ? `>>${quotedPostId}\n` : "";

	useEffect(() => {
		if (quotedPostId) setContent(initialContent);
	}, [quotedPostId]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField label='Name' placeholder='Anonymous' size='small' value={name} onChange={(e) => setContent(e.target.value)} />
			<TextField label='Content' multiline rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
			<Box id='controls' sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
				<Button variant='outlined'>Cancel</Button>
				<Button variant='contained'>Post Reply</Button>
			</Box>
		</Box>
	);
}
