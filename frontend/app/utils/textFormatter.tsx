import { Typography } from "@mui/material";

export const formatPostContent = (content: string) => {
	if (!content) return null;

	return content.split("\n").map((line, index) => {
		const isPostLink = line.trim().startsWith(">>");
		const isGreentext = line.trim().startsWith(">");

		return (
			<Typography
				key={index}
				variant='body1'
				sx={{
					color:
						isPostLink ? "primary.main"
						: isGreentext ? "secondary.main"
						: "text.primary",
					fontFamily: isGreentext ? "monospace" : "inherit",
					fontSize: "0.9375rem",
					display: "block",
					minHeight: "1.2em",
					wordBreak: "break-word",
				}}>
				{line}
			</Typography>
		);
	});
};
