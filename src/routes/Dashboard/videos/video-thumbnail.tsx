import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme, Container, Typography, Skeleton, Card, CardMedia, CardContent, CardActionArea, Button } from "@mui/material";
import { Upload, AutoAwesome, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Define the VideoObject interface
const VideoThumbnail = (props: { videoObject: any, navigationPath: string}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);
	return (
		<Card key={props.videoObject["video-id"]["S"]} sx={{ minWidth: 200, flex: 1 }}>
			<CardActionArea
				disabled={loading}
				onClick={() => {
					navigate(props.navigationPath + `watch?v=${props.videoObject["video-id"]["S"]}`, { state: { videoObject: props.videoObject } });
				}}
			>
				{loading && <Skeleton sx={{ height: 194 }} animation="wave" variant="rectangular" />}
				<CardMedia
					component="img"
					height="194"
					sx={{ display: loading ? "none" : "block" }}
					image={`${process.env.REACT_APP_CDN_URL}${props.videoObject.thumbnailKey.S}`}
					onLoad={() => {
						console.log("loaded");
						setLoading(false);
					}}
				>
					{/* <img
						alt={props.videoObject.title.S}
						src={`${process.env.REACT_APP_CDN_URL}${props.videoObject.thumbnailKey.S}`}
						onLoad={() => {
							console.log("loaded");
							setLoading(false);
						}}
					/> */}
				</CardMedia>
				<CardContent sx={{ gap: 2 }}>
					{loading ? (
						<React.Fragment>
							<Skeleton animation="wave" height={40} style={{ marginBottom: 6 }} />
							<Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
							<Skeleton animation="wave" height={30} width={"50%"} />
						</React.Fragment>
					) : (
						<>
							<Typography variant="h6" sx={{ fontSize: 16, fontWeight: "700" }} color="text.primary" gutterBottom>
								{props.videoObject.title.S}
							</Typography>

							<Typography variant="body2" sx={{ mb: 2 }}>
								{props.videoObject.description.S}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								{new Date(Number(props.videoObject["updatedAt"]["N"]) * 1000).toLocaleDateString()}{" "}
								{new Date(Number(props.videoObject["updatedAt"]["N"]) * 1000).toLocaleTimeString()}
							</Typography>
						</>
					)}
				</CardContent>
				{/* <CardActions>
								<IconButton size="large" color="primary">
									<AutoAwesome />
								</IconButton>
							</CardActions> */}
			</CardActionArea>
		</Card>
	);
};

export default VideoThumbnail;
