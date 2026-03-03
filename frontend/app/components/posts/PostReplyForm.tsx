"use client";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Image from "next/image";
import { postReply } from "@/app/actions/postReply";

export default function PostReplyForm() {
	const { quotedPostId, close, board, topicId } = usePostFormContext();
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// I should probably make a function for inserting the quoted post.
	const initialContent = quotedPostId ? `>>${quotedPostId}\n` : "";

	const handleImageChange = (file: File) => {
		setImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	useEffect(() => {
		if (quotedPostId) setContent(initialContent);
	}, [quotedPostId]);

	const handleSubmit = async () => {
		if (!board || !topicId) return;

		const formData = new FormData();

		formData.append("name", name || "Anonymous");
		formData.append("content", content);
		if (image) formData.append("image", image);

		await postReply(board, topicId, formData);
		close();
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField label='Name' placeholder='Anonymous' size='small' value={name} onChange={(e) => setName(e.target.value)} />
			<TextField label='Content' multiline rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
			<Box id='controls' sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
				<Button onClick={close} variant='outlined'>
					Cancel
				</Button>
				<Button variant='contained' onClick={handleSubmit}>
					Post Reply
				</Button>
			</Box>
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				style={{ display: "none" }}
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) handleImageChange(file);
				}}
			/>
			<Box
				onClick={() => fileInputRef.current?.click()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					const file = e.dataTransfer.files?.[0];
					if (file) handleImageChange(file);
				}}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					border: "1px dashed",
					borderRadius: 1,
					p: 2,
					textAlign: "center",
					cursor: "pointer",
					"&:hover": { borderColor: "primary.main" },
				}}>
				{imagePreview ?
					<Image src={imagePreview} alt='preview' width={200} height={200} style={{ width: "100%", maxHeight: 200, objectFit: "contain" }} />
				:	<InsertPhotoIcon sx={{ opacity: 0.2 }} />}
			</Box>
		</Box>
	);
}
