import React, { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import Login from "./login";
import Signup from "./signup";
import Verification from "./verification";

const Auth = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const loc = useLocation();

	useEffect(() => {
		const regex = /^\/auth\/(login|signup|verfication)(\/)?$/;
		if (!!auth.user && regex.test(loc.pathname)) {
			navigate("/dashboard");
		}
	}, [auth.user]);

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/verification" element={<Verification />} />
		</Routes>
	);
};

export default Auth;
