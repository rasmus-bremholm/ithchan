import { Box, Skeleton, Divider } from "@mui/material";
export default function TopicCardSkeleton() {
	return (
		<>
			<Box sx={{ p: 3, my: 3, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
				<Box sx={{ display: "flex", gap: 3 }}>
					<Skeleton variant='rectangular' width={200} height={200} sx={{ borderRadius: 1 }} />

					<Box sx={{ flex: 1 }}>
						<Skeleton variant='text' width='60%' height={32} sx={{ mb: 1 }} />
						<Skeleton variant='text' width='40%' height={20} sx={{ mb: 2 }} />
						<Skeleton variant='text' width='100%' sx={{ mb: 1 }} />
						<Skeleton variant='text' width='90%' sx={{ mb: 1 }} />
						<Skeleton variant='text' width='30%' sx={{ mt: 2 }} />
					</Box>
				</Box>

				<Box sx={{ mt: 2, ml: 3, display: "flex", flexDirection: "column", gap: 1 }}>
					{/* Much better way to do arbetrary maps */}
					{[1, 2].map((i) => (
						<Box
							key={i}
							sx={{
								display: "flex",
								gap: 2,
								p: 2,
								bgcolor: "background.paper",
								borderRadius: 1,
							}}>
							<Skeleton variant='rectangular' width={80} height={80} sx={{ borderRadius: 1 }} />
							<Box sx={{ flex: 1 }}>
								<Skeleton variant='text' width='30%' height={16} />
								<Skeleton variant='text' width='80%' />
							</Box>
						</Box>
					))}
				</Box>
			</Box>
			<Divider />
		</>
	);
}
