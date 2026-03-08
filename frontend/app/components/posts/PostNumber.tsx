"use client";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import { Typography, Box } from "@mui/material";

interface PostNumberProps {
	postId: number;
	board: string;
	topicId: number;
}

export default function PostNumber({ postId, board, topicId }: PostNumberProps) {
	const { open, isOpen, setContent } = usePostFormContext();

	const handleTheFuckingClick = () => {
		if (isOpen) {
			setContent((prev) => prev + `>>${postId}\n`);
		} else {
			open("reply", board, topicId, postId);
		}
	};

	return (
		<Box sx={{ display: "inline-flex", gap: 1, cursor: "pointer" }} onClick={handleTheFuckingClick}>
			<Typography component='span'>No. </Typography>
			<Typography component='span' sx={{ color: "primary.main" }}>
				{postId}
			</Typography>
		</Box>
	);
}
