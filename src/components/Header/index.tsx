import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "@mui/system";

import { HeaderRoutes } from "../../constants";
import Logo from "../Logo";
import Avatar from "./avatar";
import "./style.css";

interface TabProps {
	title: string;
}
const Tab: React.FC<TabProps> = props => {
	const loc = useLocation();
	return (
		<Link className={`header-tab ${HeaderRoutes[props.title] === loc.pathname ? "header-tab-active" : ""}`} to={HeaderRoutes[props.title]}>
			{props.title}
		</Link>
	);
};

interface Props {
	onSearch?: (keyword: string | undefined) => void;
}

const Header: React.FC<Props> = props => {
	return (
		<Container maxWidth="lg">
			<div className="header">
				<div style={{ flex: 1 }}>
					<Logo href="/" style={{ height: 30 }} />
				</div>
				<div className="header-tabs">
					{Object.keys(HeaderRoutes).map(title => (
						<Tab key={title} title={title} />
					))}
				</div>
				<Avatar />
			</div>
		</Container>
	);
};

export default Header;
