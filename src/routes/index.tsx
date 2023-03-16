import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { Private, Modal, Notification } from "../components";

function App() {
	return (
		<>
			<Notification />
			<Modal />
			<BrowserRouter>
				<Routes>
					<Route path="/auth/*" element={<Auth />} />
					<Route
						path="/dashboard/*"
						element={
							<Private>
								<Dashboard />
							</Private>
						}
					/>
					<Route path="/*" element={<Landing />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
