import React, { useMemo, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container, Stack, Grid, Typography, Button, Paper, Divider, LinearProgress, Card, CardActionArea, CardMedia, Skeleton } from "@mui/material";
import { AutoFixHigh, Insights } from "@mui/icons-material";
import ReactCrop, { Crop } from "react-image-crop";

import { extractSkeleton, getVideo } from "../../../api/video";
import { useAuth } from "../../../contexts/auth";
import { getCroppedImg } from "../../../utils/video";

const crops = {
	"4.0": { bbox_left: 1031.0, bbox_top: 317.0, bbox_w: 59.0, bbox_h: 70.0 },
	"3.0": { bbox_left: 125.0, bbox_top: 512.0, bbox_w: 96.0, bbox_h: 114.0 },
	"2.0": { bbox_left: 885.0, bbox_top: 357.0, bbox_w: 99.0, bbox_h: 204.0 },
	"1.0": { bbox_left: 832.0, bbox_top: 550.0, bbox_w: 157.0, bbox_h: 233.0 },
} as any;

type VideoObject = {
	videoKey: { S: string };
	title: { S: string };
	skeletonKey?: { S: string };
	thumbnailKey: { S: string };
	inferenceTaskStatus?: { S: string };
	"video-id": { S: string };
};

const Watch = () => {
	const [params, setParams] = useSearchParams();
	const auth = useAuth();
	const [videoObject, setVideoObject] = React.useState<VideoObject>();
	const [pending, setPending] = React.useState(false);
	const [crop, setCrop] = React.useState<any>({
		unit: "px", // Can be 'px' or '%'
		x: 832,
		y: 550,
		width: 157,
		height: 233,
		id: 0,
	});
	const [croppedImgs, setCroppedImgs] = React.useState<Array<any>>([]);

	useEffect(() => {
		if (videoObject && croppedImgs.length === 0) {
			fetch(`${process.env.REACT_APP_CDN_URL}${videoObject.thumbnailKey.S}`).then(async response => {
				const blob = await response.blob();
				const file = new File([blob], crop.id, { type: "image/png" });
				Object.keys(crops).forEach(async (key: any) => {
					let padding = 35;
					let crop = {
						id: Number(key),
						x: crops[key].bbox_left - padding,
						y: crops[key].bbox_top - padding,
						width: crops[key].bbox_w + padding * 2,
						height: crops[key].bbox_h + padding * 2,
					};
					let res = await getCroppedImg(file, crop);
					setCroppedImgs(prev => [...prev, res]);
				});
			});
		}
	}, [videoObject?.thumbnailKey.S]);

	useEffect(() => {
		getVideo(params.get("v")).then((res: any) => {
			if (res.data.Item) {
				const v = res.data.Item;
				setVideoObject(v);
				setPending(v.inferenceTaskStatus?.S === "PENDING");
			}
		});
	}, [params]);

	return (
		<Container maxWidth="lg">
			<Stack direction="column" alignItems="center" sx={{ minHeight: "64px", mb: 3 }}>
				{videoObject && (
					<video
						controls
						autoPlay
						src={`${process.env.REACT_APP_CDN_URL}${videoObject.videoKey.S}`}
						style={{ width: "100%", borderRadius: 8 }}
					/>
				)}
				{/* {videoObject?.skeletonKey?.S && (
					<video
						controls
						autoPlay
						src={`${process.env.REACT_APP_CDN_URL}${videoObject?.skeletonKey?.S}`}
						style={{ width: "100%", borderRadius: 8 }}
					/>
				)} */}
			</Stack>
			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px", mb: 3 }} spacing={2}>
				<Grid item xs>
					<Typography variant="h5">{videoObject?.title.S}</Typography>
				</Grid>
				<Grid item xs="auto" sx={{ justifyContent: "end" }}>
					<Paper elevation={3} sx={{ px: 5, borderRadius: 2 }}>
						<Stack direction="row" alignItems="center" justifyItems="center" sx={{ minHeight: "64px" }} spacing={5}>
							<Button variant="text" color="primary" sx={{ textTransform: "none" }} startIcon={<AutoFixHigh />}>
								AI Edit
							</Button>
							<Divider orientation="vertical" variant="middle" flexItem />
							<Button
								variant="text"
								color="primary"
								sx={{ textTransform: "none" }}
								startIcon={<Insights />}
								disabled={pending}
								onClick={() => {
									videoObject &&
										extractSkeleton(auth.user, videoObject["video-id"]["S"])
											.then(res => {
												console.log(res);
												setPending(true);
											})
											.catch(err => {
												console.error(err);
												setPending(false);
											});
								}}
							>
								Analyze
							</Button>
						</Stack>
					</Paper>
				</Grid>
			</Stack>
			{pending && (
				<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
					<Grid item xs>
						<Paper elevation={3} sx={{ px: 5, borderRadius: 2 }}>
							<Stack direction="column" justifyItems="center" sx={{ minHeight: "64px", py: 5, px: 2 }} spacing={2}>
								<Typography variant="h6">AI is currently analyzing your video. It may take about 10 minutes.</Typography>
								<LinearProgress />
							</Stack>
						</Paper>
					</Grid>
				</Stack>
			)}
			<Paper elevation={3} sx={{ px: 5, py: 3, borderRadius: 2 }}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Which one is you?
				</Typography>
				<Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ width: "100%" }} spacing={2}>
					{croppedImgs.length > 0 &&
						croppedImgs.map((img, i) => (
							<Card key={i} sx={{ height: 200 }}>
								<CardActionArea disabled={!img} onClick={() => {}}>
									{!img && <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />}
									<CardMedia component="img" height="200" sx={{ display: !img ? "none" : "block" }} image={img}>
										{/* <img
				alt={props.videoObject.title.S}
				src={`${process.env.REACT_APP_CDN_URL}${props.videoObject.thumbnailKey.S}`}
				onLoad={() => {
					console.log("loaded");
					setLoading(false);
				}}
			/> */}
									</CardMedia>
									{/* <CardActions>
						<IconButton size="large" color="primary">
							<AutoAwesome />
						</IconButton>
					</CardActions> */}
								</CardActionArea>
							</Card>
						))}
				</Stack>
			</Paper>
		</Container>
	);
};

export default Watch;
