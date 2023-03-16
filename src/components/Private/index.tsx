import React, { useEffect, useState, useMemo } from "react";
// import { AuthProps } from "../../redux/lib/auth.type";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface Props {
	children: React.ReactElement;
}
const PrivateRoute: React.FC<Props> = props => {
	const auth = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<Boolean>(false);

	useEffect(() => {
		if (!auth.user) {
			navigate("/auth/login", { replace: true });
		}
	}, [auth.user]);

	return <>{loading ? <></> : auth.user !== undefined ? props.children : <></>}</>;
};

export default PrivateRoute;
