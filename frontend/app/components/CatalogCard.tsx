import { Typography, Box, Card, CardContent, Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

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
				borderColor: "text.secondary",
				"&:hover": { borderColor: "text.primary" },
				minWidth: 200,
				maxHeight: 300,
				overflow: "hidden",
			}}>
			<Link href={`/${props.boardName}/${props.topicId}`} style={{ textDecoration: "none", color: "inherit" }}>
				<Box sx={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
					{props.thumbNailPath && <Image src={`${backendUrl}/${props.thumbNailPath}`} alt={props.subject} fill style={{ objectFit: "cover" }} />}
				</Box>
				<CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
					<Typography># {props.topicId}</Typography>
					<Divider sx={{ my: 1, width: "100%" }} />
					{props.subject}
				</CardContent>
			</Link>
		</Card>
	);
}
