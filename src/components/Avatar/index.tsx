import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar as MuiAvatar } from "@mui/material";

import { useAuth } from "../../contexts/auth";

interface Props {
	size?: number;
	url: string;
}

const Avatar: React.FC<Props> = props => {
	const navigate = useNavigate();
	return (
		<div style={{ height: props.size || 60, width: props.size || 60 }} onClick={() => navigate("/dashboard")}>
			<MuiAvatar alt="avatar" src={props.url} />
		</div>
	);
};

export default Avatar;
