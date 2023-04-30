import React, { useMemo, useEffect, useRef, createRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
	Container,
	Stack,
	Grid,
	Typography,
	Button,
	Paper,
	Divider,
	LinearProgress,
	Card,
	CardActionArea,
	CardMedia,
	Skeleton,
	Box,
} from "@mui/material";
import { AutoFixHigh, Insights, Delete } from "@mui/icons-material";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title, LinearScale, CategoryScale } from "chart.js";
import { Radar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import { extractSkeleton, getVideo } from "../../../api/video";
import { useAuth } from "../../../contexts/auth";
import { getCroppedImg } from "../../../utils/video";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const options = {
	plugins: {
		legend: {
			labels: {
				color: "white",
				font: {
					size: 14, // Set the font size for the legend labels
				},
			},
		},
		tooltip: {
			bodyFont: {
				size: 14, // Set the font size for the tooltip labels
			},
		},
	},
	scales: {
		r: {
			grid: {
				color: "",
			},
			pointLabels: {
				color: "white",
				font: {
					size: 12, // Set the font size for the legend labels
				},
			},
			ticks: {
				display: false,
			},
		},
	},
};

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
	const videoRef = useRef(null);
	const [ctime, setCTime] = React.useState(0);
	const [crop, setCrop] = React.useState<any>({
		unit: "px", // Can be 'px' or '%'
		x: 832,
		y: 550,
		width: 157,
		height: 233,
		id: 0,
	});
	const [croppedImgs, setCroppedImgs] = React.useState<Array<any>>([]);
	const [speedData, setSpeedData] = React.useState<any>(0);
	const [charjsdata, setCharjsdata] = React.useState<any>({
		labels: ["Drop", "Smash/Clear", "Moving"],
		datasets: [
			{
				label: "Pose classification",
				data: [1, 1, 1],
			},
		],
	});

	const randomSpeedDataUpdate = () => {
		if (!videoRef || !videoRef.current) return;
		const currentTime = (videoRef.current as any).currentTime; // Current playback time in seconds
		if (Math.floor(currentTime) <= ctime) return;
		setSpeedData(Math.floor(Math.random() * 100));
		setCTime(Math.floor(currentTime));
	};
	const randomUpdate = () => {
		let dataList = [];
		let tot = 0;
		for (var i = 0; i < 3; i++) {
			dataList.push(Math.floor(Math.random() * 100));
			tot += dataList[i];
		}
		setCharjsdata({
			labels: ["Drop", "Smash/Clear", "Moving"],
			datasets: [
				{
					label: "Pose classification",
					data: dataList.map(d => d / tot),
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1,
				},
			],
		});
	};

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
			<Stack direction={{ sm: "column", md: "row" }} sx={{ minHeight: "500px", mb: 3, py: 4 }} spacing={4}>
				<Stack direction="column" spacing={2} sx={{ flex: 3 }}>
					<Box component="div">
						{videoObject && (
							<video
								ref={videoRef}
								controls
								autoPlay
								src={`${process.env.REACT_APP_CDN_URL}${videoObject.videoKey.S}`}
								style={{ width: "100%", borderRadius: 8 }}
								onCanPlay={() => {
									setCTime(0);
									setSpeedData(0);
								}}
								onTimeUpdate={() => {
									requestAnimationFrame(() => {
										randomUpdate();
										randomSpeedDataUpdate();
									});
								}}
							/>
						)}
					</Box>
					<Typography variant="h5">{videoObject?.title.S}</Typography>
				</Stack>
				<Box component="div" sx={{ flex: 1 }}>
					<Stack direction="column" sx={{ minHeight: "64px", mb: 3 }} spacing={4}>
						<Paper elevation={3} sx={{ px: 5, py: 3, borderRadius: 2 }}>
							<Radar
								options={options}
								data={charjsdata}
								//   {...props}
							/>
						</Paper>
						<Paper elevation={3} sx={{ px: 5, py: 3, borderRadius: 2 }}>
							<Stack direction="column" alignItems="center" spacing={2}>
								<Typography variant="h6">Moving Speed</Typography>
								<Typography variant="h1">{speedData}</Typography>
							</Stack>
						</Paper>
					</Stack>
				</Box>
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
			{/* <Paper elevation={3} sx={{ px: 5, py: 3, borderRadius: 2 }}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Which one is you?
				</Typography>
				<Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ width: "100%" }} spacing={2}>
					{croppedImgs.length > 0 &&
						croppedImgs.map((img, i) => (
							<Card key={i} sx={{ height: 200 }}>
								<CardActionArea disabled={!img} onClick={() => {}}>
									{!img && <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />}
									<CardMedia component="img" height="200" sx={{ display: !img ? "none" : "block" }} image={img}></CardMedia>
								</CardActionArea>
							</Card>
						))}
				</Stack>
			</Paper> */}
		</Container>
	);
};

export default Watch;
