"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useState } from "react";

interface HoverImageProps {
	thumbNailPath: string;
	imagePath: string;
	width: number;
	height: number;
	orgWidth: number;
	orgHeight: number;
	alt: string;
}

export default function HoverImage({ thumbNailPath, imagePath, width, height, orgWidth, orgHeight, alt }: HoverImageProps) {
	const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
	const [expanded, setExpanded] = useState(false);

	const handleMouseEnter = (e: React.MouseEvent) => {
		const x = e.clientX;
		const y = e.clientY;

		const clampedX = Math.min(x, window.innerWidth - orgWidth - 16);
		const clampedY = Math.min(y, window.innerHeight - orgHeight - 16);

		setHoverPos({ x: clampedX, y: clampedY });
	};

	return (
		<>
			{expanded ?
				<Image src={imagePath} height={orgHeight} width={orgWidth} alt={alt} />
			:	<Image onMouseEnter={handleMouseEnter} onMouseLeave={() => setHoverPos(null)} src={thumbNailPath} height={height} width={width} alt={alt} />}
			{hoverPos && (
				<Box sx={{ position: "fixed", left: hoverPos.x, top: hoverPos.y, zIndex: 9999, pointerEvents: "none" }}>
					<Image src={imagePath} height={orgHeight} width={orgWidth} alt={alt} />
				</Box>
			)}
		</>
	);
}
