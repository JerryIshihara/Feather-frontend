import React, {useState, useEffect} from "react";
import { useTheme, Container, Typography, Stack, Avatar, Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../../contexts/auth";
import HeatMap from '@uiw/react-heat-map';
import { getVideo } from "../../api/video";
import { grey } from '@mui/material/colors';

const Profile = () => {
	const theme = useTheme();
	const auth = useAuth() as any;

	const [activeDates, setActiveDates] = useState<any[]>([]);
	const [totalActiveDate, setTotalActiveDate] = useState<number>(0);
	const [uniqueDate, setUniqueDate] = useState<number>(0);

	useEffect(() => {
		if (activeDates.length > 0) return;
		getVideo(null)
			.then(res => {
				if(res.data.Items.length > 0) {
					const dates:string[] = res.data.Items.map((updateTime:any) => {
						return new Date(Number(updateTime["updatedAt"]["N"]) * 1000).toLocaleDateString('zh-Hans-CN');
					})
					const counts = dates.map(activeDate => ({
						date: activeDate,
						count: dates.filter(item => item === activeDate).length,
						content: ''
					}));
					const totalCount = counts.reduce((a,v) =>  a = a + v.count , 0 );

					// console.log("totalCount", totalCount);
					// console.log(JSON.stringify(counts));
					setUniqueDate(() => counts.length);
					setActiveDates((() => [...counts]));
					setTotalActiveDate(() => totalCount);
				}
			});
	}, []);

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
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Avatar</b>
								</td>
								<td style={{ width: "60%" }}>
									<Avatar src={auth.user.attributes.picture} sx={{ width: 80, height: 80 }} />
								</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Name</b>
								</td>
								<td style={{ width: "60%" }}>Golden Bear</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Gender</b>
								</td>
								<td style={{ width: "60%" }}>Rather not say</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Membership</b>
								</td>
								<td style={{ width: "60%" }}>{auth.plan || "Basic"}</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Achievements</b>
								</td>
								<td style={{ width: "60%" }}>
									<Tooltip title="Active Player" arrow>
										<span> 🏅 </span>
									</Tooltip>
									&nbsp;
									<Tooltip title="Active Vlogger" arrow>
										<span> 🥇 </span>
									</Tooltip>
									&nbsp;
									<Tooltip title="Active Commentor" arrow>
										<span> 🏆 </span>
									</Tooltip>
									&nbsp;
								</td>
							</tr>
						</tbody>
					</table>
				</Stack>
				
				{/********************************************** Heat Map **********************************************/}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Past Active Badminton Dates
					</Typography>
					<Stack direction="row" spacing={2} alignItems="center" justifyContent="center">

					<HeatMap
						value={activeDates}
						width={600}
						height={250}
						startDate={new Date('2023/02/01')}
						endDate={new Date('2023/05/01')}
						weekLabels={undefined}
						rectSize={25}
						style={{ color: '#D3D3D3' }}
						rectProps={{
							rx: 3
						  }}
						monthLabels={['', 'Feb', 'Mar', 'Apr', 'May', '', '', '', '', '', '', '']}
						rectRender={(props, data) => {
							return (
							<Tooltip key={props.key} placement="top" title={`count: ${data.count || 0}`}>
								<rect {...props} />
							</Tooltip>
							);
						}}
    				/>
				
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Total Active Days: {totalActiveDate}
						<br/>
						Unique Active Days: {uniqueDate}
					</Typography>
					</Stack>
			
					
				</Stack>

				{/********************************************** Contact Information **********************************************/}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Contact Information
					</Typography>
					<table style={{ borderCollapse: "collapse", border: "none", marginTop: "20px" }}>
						<tbody style={{ lineHeight: "3em" }}>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Email</b>
								</td>
								<td style={{ width: "60%" }}>golden_bear@berkeley.edu</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Phone Number</b>
								</td>
								<td style={{ width: "60%" }}>510-666-6666</td>
							</tr>
						</tbody>
					</table>
				</Stack>

				{/********************************************** Addresses **********************************************/}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Address
					</Typography>
					<table style={{ borderCollapse: "collapse", border: "none", marginTop: "20px" }}>
						<tbody style={{ lineHeight: "3em" }}>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Street Address</b>
								</td>
								<td style={{ width: "60%" }}>123 Main Street</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>City</b>
								</td>
								<td style={{ width: "60%" }}>Berkeley</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>State/Province</b>
								</td>
								<td style={{ width: "60%" }}>California</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Postal Code</b>
								</td>
								<td style={{ width: "60%" }}>94709</td>
							</tr>
							<tr>
								<td style={{ paddingRight: "5px", width: "40%" }}>
									<b>Country</b>
								</td>
								<td style={{ width: "60%" }}>U.S.A</td>
							</tr>
						</tbody>
					</table>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Profile;
