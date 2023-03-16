import React from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";

interface Props {
	style?: React.CSSProperties;
	href?: string;
}

const Logo: React.FC<Props> = props => {
	const navigate = useNavigate();
	return (
		<div
			className="logo"
			onClick={() => {
				if (props.href) {
					navigate(props.href);
				}
			}}
		>
			<img alt="logo" src={require("../../assets/logo.png")} style={{ height: "50px", margin: 0, ...props.style }} />
		</div>
	);
};

export default Logo;
