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
	borderRadius: number;
}

export default function HoverImage({ thumbNailPath, imagePath, width, height, orgWidth, orgHeight, alt, borderRadius }: HoverImageProps) {
	const [hoverPos, setHoverPos] = useState<{ x: number; y: number; displayWidth: number; displayHeight: number } | null>(null);
	const [expanded, setExpanded] = useState(false);

	const handleMouseEnter = (e: React.MouseEvent) => {
		// We NEEED clamping *doh*
		const maxWidth = window.innerWidth * 0.9;
		const maxHeight = window.innerHeight * 0.9;
		const scale = Math.min(1, maxWidth / orgWidth, maxHeight / orgHeight);
		const displayWidth = Math.round(orgWidth * scale);
		const displayHeight = Math.round(orgHeight * scale);

		const x = e.clientX;
		const y = e.clientY;

		const clampedX = Math.min(x, window.innerWidth - displayWidth - 16);
		const clampedY = Math.min(y, window.innerHeight - displayHeight - 16);

		setHoverPos({ x: clampedX, y: clampedY, displayWidth, displayHeight });
	};

	return (
		<>
			{expanded ?
				<Image src={imagePath} height={orgHeight} width={orgWidth} alt={alt} style={{ objectFit: "cover", borderRadius: borderRadius }} />
			:	<Image
					onMouseEnter={handleMouseEnter}
					onMouseLeave={() => setHoverPos(null)}
					src={thumbNailPath}
					height={height}
					width={width}
					alt={alt}
					style={{ objectFit: "cover", borderRadius: borderRadius }}
				/>
			}
			{hoverPos && (
				<Box sx={{ position: "fixed", left: hoverPos.x, top: hoverPos.y, zIndex: 9999, pointerEvents: "none" }}>
					<Image
						src={imagePath}
						height={hoverPos.displayHeight}
						width={hoverPos.displayWidth}
						alt={alt}
						style={{ objectFit: "cover", borderRadius: borderRadius }}
					/>
				</Box>
			)}
		</>
	);
}
