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
	const auth = useAuth() as any;
	const navigate = useNavigate();
	const show = useMemo(() => (auth.user ? true : false), [auth.user]);
	return (
		<div style={{ flex: 1 }}>
			<div className="login-tabs">
				{show ? (
					<div onClick={() => navigate("/dashboard")}>
						<Avatar src={auth.user.attributes.picture} />
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
