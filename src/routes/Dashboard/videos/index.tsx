import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme, Container, Typography, Stack, Grid, Box, CircularProgress, Button } from "@mui/material";
import { Upload, AutoAwesome, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { getVideo } from "../../../api/video";
import VideoModal from "./upload-modal";
import Watch from "./watch";
import VideoThumbnail from "./video-thumbnail";

const Video = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [file, setFile] = useState<File>();
	const [videos, setVideos] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const upload = async (event: any) => {
		const file = event.target.files[0];
		// console.log(file.name.split(".").pop());
		if (!file.type.includes("video")) {
			alert("not a video and don't submit, just return");
			return;
		}
		setFile(file);
	};
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
			<Route path="/watch" element={<Watch />} />
			<Route
				path="/"
				element={
					<Container maxWidth="lg">
						<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
							<Grid item xs>
								<Typography variant="h4">Videos</Typography>
							</Grid>
							<Grid item xs="auto" sx={{ justifyContent: "end" }}>
								<input
									id="icon-button-photo"
									onChange={e => {
										upload(e);
									}}
									style={{ display: "none" }}
									type="file"
								/>
								<label htmlFor="icon-button-photo">
									<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<Upload />} component="span">
										Upload
									</Button>
								</label>
							</Grid>
						</Stack>

						{loading ? (
							<Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 400, width: "100%" }} spacing={2}>
								<CircularProgress size={50} />
							</Stack>
						) : (
							<Box component="div" sx={{ mt: theme.spacing(4), display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr" }, gap: 4 }}>
								{videos.map(item => (
									<VideoThumbnail key={item["video-id"]["S"]} videoObject={item} navigationPath = '/dashboard/video/'/>
								))}
							</Box>
						)}

						<VideoModal file={file} handleClose={() => setFile(undefined)} />
					</Container>
				}
			/>
		</Routes>
	);
};

export default Video;
