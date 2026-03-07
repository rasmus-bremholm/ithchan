import fs from "fs";
import path from "path";
import { Box } from "@mui/material";
import Image from "next/image";

function getBanners(board: string) {
	const bannerDir = path.join(process.cwd(), "public", "banners", board);
	if (!fs.existsSync(bannerDir)) return [];
	return fs.readdirSync(bannerDir).filter((f) => /\.(jpg|png|gif|webp)$/i.test(f));
}

export default function Banner({ board }: { board: string }) {
	const banners = getBanners(board);
	if (banners.length === 0) return null; // Maybe I should get a placeholder image.

	const randomBanner = banners[Math.floor(Math.random() * banners.length)];

	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1, margin: "auto", borderRadius: 0.5, overflow: "hidden" }}>
			<Image src={`/banners/${board}/${randomBanner}`} alt='board banner' width={300} height={100} />
		</Box>
	);
}
