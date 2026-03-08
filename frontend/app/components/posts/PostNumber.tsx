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
		<Box
			component='span'
			sx={{
				display: "inline-flex",
				gap: 0.5,
				cursor: "pointer",
				color: "text.secondary",
				"&:hover": {
					color: "primary.main",
				},
			}}
			onClick={handleTheFuckingClick}>
			<Typography component='span'>No. </Typography>
			<Typography component='span' sx={{}}>
				{postId}
			</Typography>
		</Box>
	);
}
