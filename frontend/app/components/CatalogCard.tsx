import { Typography, Box, Card, CardContent, Divider, alpha } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Reply, Collections } from "@mui/icons-material";

interface CatalogCardProps {
	boardName: string;
	topicId: number;
	subject: string;
	thumbNailPath?: string;
	replyCount?: number;
}

export default function CatalogCard(props: CatalogCardProps) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

	return (
		<Card
			variant='outlined'
			sx={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid",
				borderColor: "divider",
				minWidth: 200,
				maxHeight: 350,
				overflow: "hidden",
				position: "relative",
				transition: (theme) =>
					theme.transitions.create(["transform", "box-shadow", "border-color"], {
						duration: theme.transitions.duration.shortest,
						easing: theme.transitions.easing.easeIn,
					}),
				"&:hover": {
					borderColor: "primary.main",
					transform: "scale(1.04)",
					zIndex: 2,
					boxShadow: (theme) => `0 10px 30px ${alpha(theme.palette.common.black, 0.3)}`,
				},
			}}>
			<Link href={`/${props.boardName}/${props.topicId}`} style={{ textDecoration: "none", color: "inherit" }}>
				<Box sx={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
					{props.thumbNailPath && <Image src={`${backendUrl}/${props.thumbNailPath}`} alt={props.subject} fill style={{ objectFit: "cover" }} />}
				</Box>
				<CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
					<Box sx={{ display: "flex" }}>
						<Typography sx={{ flex: 1 }}># {props.topicId}</Typography>
						<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
							<Reply sx={{ fontSize: 16 }} /> {props.replyCount}
							<Collections sx={{ fontSize: 16 }} />
						</Box>
					</Box>

					<Divider sx={{ my: 1, width: "100%" }} />
					<Box sx={{ overflow: "hidden" }}>{props.subject}</Box>
				</CardContent>
			</Link>
		</Card>
	);
}
