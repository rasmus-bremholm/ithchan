"use client";
import { usePostFormContext } from "@/app/utils/PostFormContext";
import { Typography } from "@mui/material";

interface PostNumberProps {
	postId: number;
	board: string;
	topicId: number;
}

export default function PostNumber({ postId, board, topicId }: PostNumberProps) {
	const { open } = usePostFormContext();

	return (
		<Typography component='span' sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => open("reply", board, topicId, postId)}>
			No.{postId}
		</Typography>
	);
}
