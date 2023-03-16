import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme, Container, Typography, Stack, Grid, Box, Card, CardMedia, CardContent, CardActionArea, Button } from "@mui/material";
import { Upload, AutoAwesome, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { getVideos } from "../../../api/video";
import VideoModal from "./upload-modal";
import Watch from "./watch";

const Video = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [file, setFile] = useState<File>();
	const [videos, setVideos] = useState<any[]>([]);
	const upload = async (event: any) => {
		const file = event.target.files[0];
		if (!file.type.includes("video")) {
			alert("not a video and don't submit, just return");
			return;
		}
		setFile(file);
	};
	useEffect(() => {
		if (videos.length > 0) return;
		getVideos().then(res => {
			setVideos(res.data.body.Items);
		});
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

						<Box sx={{ mt: theme.spacing(4), display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr" }, gap: 4 }}>
							{videos.map(item => (
								<Card key={item["video-id"]["S"]} sx={{ minWidth: 200, flex: 1 }}>
									<CardActionArea
										onClick={() => {
											navigate(`/dashboard/video/watch?v=${item["videoKey"]["S"]}`);
										}}
									>
										<CardMedia
											component="img"
											height="194"
											image={`${process.env.REACT_APP_CDN_URL}${item.thumbnailKey.S}`}
											alt="Paella dish"
										/>
										<CardContent sx={{ gap: 2 }}>
											<Typography variant="h6" sx={{ fontSize: 16, fontWeight: "700" }} color="text.primary" gutterBottom>
												{item.title.S}
											</Typography>

											<Typography variant="body2" sx={{ mb: 2 }}>
												{item.description.S}
											</Typography>

											<Typography variant="body2" color="text.secondary">
												{new Date(Number(item["updatedAt"]["N"]) * 1000).toLocaleDateString()}{" "}
												{new Date(Number(item["updatedAt"]["N"]) * 1000).toLocaleTimeString()}
											</Typography>
										</CardContent>
										{/* <CardActions>
								<IconButton size="large" color="primary">
									<AutoAwesome />
								</IconButton>
							</CardActions> */}
									</CardActionArea>
								</Card>
							))}
						</Box>
						<VideoModal file={file} handleClose={() => setFile(undefined)} />
					</Container>
				}
			/>
		</Routes>
	);
};

export default Video;
