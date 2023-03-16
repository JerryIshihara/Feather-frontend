import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, useTheme } from "@mui/material";
import { deepOrange, cyan } from "@mui/material/colors";
import { BigHead } from "@bigheads/core";

import { useAuth } from "../../contexts/auth";
import "./style.css";

interface Props {
	onSearch?: (keyword: string | undefined) => void;
}

const HeaderAvatar: React.FC<Props> = props => {
	const theme = useTheme();
	const auth = useAuth();
	const navigate = useNavigate();
	const show = useMemo(() => (auth.user ? true : false), [auth.user]);
	return (
		<div style={{ flex: 1 }}>
			<div className="login-tabs">
				{show ? (
					<div style={{ height: 60, width: 60 }} onClick={() => navigate("/dashboard")}>
						<BigHead
							accessory="shades"
							body="chest"
							circleColor="blue"
							clothing="tankTop"
							clothingColor="black"
							eyebrows="angry"
							eyes="wink"
							facialHair="mediumBeard"
							graphic="vue"
							hair="short"
							hairColor="black"
							hat="none"
							hatColor="green"
							lashes={false}
							lipColor="purple"
							mask={true}
							faceMask={true}
							mouth="open"
							skinTone="brown"
						/>
					</div>
				) : (
					<>
						<Link className="login-tab" to={"/auth/login"}>
							Log in
						</Link>
						<Button variant="contained" size="large">
							<Link
								style={{
									textDecoration: "none",
									color: theme.palette.background.default,
								}}
								to={"/auth/signup"}
							>
								Sign up
							</Link>
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default HeaderAvatar;
