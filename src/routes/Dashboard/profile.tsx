// import React from "react";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { Container, Stack, Grid, Typography, Button, Paper, Divider } from "@mui/material";
// import { AutoFixHigh, Insights } from "@mui/icons-material";
// import ReactPlayer from "react-player";

// const Watch = () => {
// 	const [params, setParams] = useSearchParams();
// 	const { state } = useLocation();
// 	const [file, setFile] = React.useState<string>();
// 	return (
// 		<Container maxWidth="lg">
// 			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
// 				<Grid item xs>
// 					<Typography variant="h5">{state.videoObject.title.S}</Typography>
// 				</Grid>
// 				<Grid item xs="auto" sx={{ justifyContent: "end" }}></Grid>
// 			</Stack>
// 			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px", my: 2 }}>
// 				<input
// 					type="file"
// 					accept="video/*"
// 					onChange={(e: any) => {
// 						var f = e.target.files[0];
// 						console.log(URL.createObjectURL(f));
// 						setFile(URL.createObjectURL(f));
// 					}}
// 				/>

// 				{file && <ReactPlayer url={file} />}

// 				{/* <video controls autoPlay src={`${process.env.REACT_APP_CDN_URL}${params.get("v")}`} style={{ width: "100%", borderRadius: 10 }} /> */}
// 			</Stack>
// 			<Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
// 				<Paper elevation={3} sx={{ px: 5, borderRadius: 10 }}>
// 					<Stack direction="row" alignItems="center" justifyItems="center" sx={{ minHeight: "64px" }} spacing={5}>
// 						<Button variant="text" color="primary" sx={{ textTransform: "none" }} startIcon={<AutoFixHigh />}>
// 							AI Edit
// 						</Button>
// 						<Divider orientation="vertical" variant="middle" flexItem />
// 						<Button variant="text" color="primary" sx={{ textTransform: "none" }} startIcon={<Insights />}>
// 							Analyze
// 						</Button>
// 					</Stack>
// 				</Paper>
// 			</Stack>
// 		</Container>
// 	);
// };

// export default Watch;

import React from "react";
import {
	useTheme,
	Container,
	Typography,
	Stack,
	Avatar,
} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from "../../contexts/auth";

const Profile = () => {
	const theme = useTheme();
	const auth = useAuth() as any;

	return (
		<Container maxWidth="lg">
		  <Stack direction="column" spacing={6} sx={{ py: 4 }}>

			{/********************************************** Basic Information **********************************************/}
			<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					Basic Information
				</Typography>
				<table style={{ borderCollapse: "collapse", border: "none", marginTop: "20px" }}>
					<tbody style={{ lineHeight: "3em" }}>
					<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Avatar: </td>
							<td style={{ width: "60%" }}><Avatar src={auth.user.attributes.picture} sx={{ width: 80, height: 80 }}/></td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Name: </td>
							<td style={{ width: "60%" }}>Golden Bear</td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Gender:</td>
							<td style={{ width: "60%" }}>Rather not say</td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Membership:</td>
							<td style={{ width: "60%" }}>Free</td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Achievements:</td>
							<td style={{ width: "60%" }}>
							    <Tooltip title="Active Player" arrow><span> 🏅 </span></Tooltip>&nbsp;
								<Tooltip title="Active Vlogger" arrow><span> 🥇 </span></Tooltip>&nbsp;
								<Tooltip title="Active Commentor" arrow><span> 🏆 </span></Tooltip>&nbsp;
							</td>
						</tr>
					</tbody>
				</table>
			</Stack>

			{/********************************************** Contact Information **********************************************/}
			<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					Contact Information
				</Typography>
				<table style={{ borderCollapse: "collapse", border: "none", marginTop: "20px" }}>
					<tbody style={{ lineHeight: "3em" }}>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Email: </td>
							<td style={{ width: "60%" }}>golden_bear@berkeley.edu</td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Phone Number:</td>
							<td style={{ width: "60%" }}>510-666-6666</td>
						</tr>
					</tbody>
				</table>
			</Stack>

			{/********************************************** Addresses **********************************************/}
			<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					Addresses
				</Typography>
				<table style={{ borderCollapse: "collapse", border: "none", marginTop: "20px" }}>
					<tbody style={{ lineHeight: "3em" }}>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Home: </td>
							<td style={{ width: "60%" }}>94704 Berkeley, CA</td>
						</tr>
						<tr>
							<td style={{ paddingRight: "5px", width: "40%" }}>Work: </td>
							<td style={{ width: "60%" }}>94709 Berkeley, CA</td>
						</tr>
					</tbody>
				</table>
			</Stack>
		  </Stack>
		</Container>
	);
};

export default Profile;
