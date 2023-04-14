import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container, Stack, Grid, Typography, Button, Paper, Divider } from "@mui/material";
import { AutoFixHigh, Insights } from "@mui/icons-material";
import ReactPlayer from "react-player";

const Watch = () => {
	const [params, setParams] = useSearchParams();
	const { state } = useLocation();
	const [file, setFile] = React.useState<string>();
	return (
		<Container maxWidth="lg">
			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
				<Grid item xs>
					<Typography variant="h5">{state.videoObject.title.S}</Typography>
				</Grid>
				<Grid item xs="auto" sx={{ justifyContent: "end" }}></Grid>
			</Stack>
			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px", my: 2 }}>
				<input
					type="file"
					accept="video/*"
					onChange={(e: any) => {
						var f = e.target.files[0];
						console.log(URL.createObjectURL(f));
						setFile(URL.createObjectURL(f));
					}}
				/>

				{file && <ReactPlayer url={file} />}

				{/* <video controls autoPlay src={`${process.env.REACT_APP_CDN_URL}${params.get("v")}`} style={{ width: "100%", borderRadius: 10 }} /> */}
			</Stack>
			<Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
				<Paper elevation={3} sx={{ px: 5, borderRadius: 10 }}>
					<Stack direction="row" alignItems="center" justifyItems="center" sx={{ minHeight: "64px" }} spacing={5}>
						<Button variant="text" color="primary" sx={{ textTransform: "none" }} startIcon={<AutoFixHigh />}>
							AI Edit
						</Button>
						<Divider orientation="vertical" variant="middle" flexItem />
						<Button variant="text" color="primary" sx={{ textTransform: "none" }} startIcon={<Insights />}>
							Analyze
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	);
};

export default Watch;
