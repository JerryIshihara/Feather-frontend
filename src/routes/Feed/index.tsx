import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme, Container, Typography, Stack, Grid, Box, CircularProgress } from "@mui/material";

import { getVideo } from "../../api/video";
import VideoThumbnail from "../Dashboard/videos/video-thumbnail";
import FeedWatch from "./feed-watch";

const Feed = () => {
	const theme = useTheme();
	const [videos, setVideos] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		if (videos.length > 0) return;
		setLoading(true);
		getVideo(null)
			.then(res => {
				setVideos(res.data.Items);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
		return () => setVideos([]);
	}, []);
	return (
		<Routes>
			<Route path="/watch" element={<FeedWatch />} />
			<Route
				path="/"
				element={
					<Container maxWidth="lg">
						<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
							<Grid item xs>
								<Typography variant="h4">Uploaded Videos</Typography>
							</Grid>
						</Stack>

						{loading ? (
							<Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 400, width: "100%" }} spacing={2}>
								<CircularProgress size={50} />
							</Stack>
						) : (
							<Box
								component="div"
								sx={{
									mt: theme.spacing(4),
									display: "grid",
									gridTemplateColumns: { lg: "1fr 1fr 1fr", sm: "1fr 1fr", xs: "1fr" },
									gap: 4,
								}}
							>
								{videos.map(item => (
									<VideoThumbnail key={item["video-id"]["S"]} videoObject={item} navigationPath="/feed/" />
								))}
							</Box>
						)}
					</Container>
				}
			/>
		</Routes>
	);
};

export default Feed;
