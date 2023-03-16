import React from "react";
import ReactDOM from "react-dom/client";
// import Amplify from "@aws-amplify/core";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { ThemeProvider } from "@mui/material/styles";

import "./index.css";
import App from "./routes";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/auth";
import { LoadingContextProvider } from "./contexts/loading";
import { theme } from "./Theme";
import { NotificationContextProvider } from "./contexts/notification";

const isLocalhost = !!(window.location.hostname === "localhost");
const [localRedirectSignIn, productionRedirectSignIn] = config.oauth.redirectSignIn.split(",");
const [localRedirectSignOut, productionRedirectSignOut] = config.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
	...config,
	oauth: {
		...config.oauth,
		redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
		redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
	},
};

Amplify.configure(updatedAwsConfig);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<NotificationContextProvider>
				<LoadingContextProvider>
					<AuthContextProvider>
						<App />
					</AuthContextProvider>
				</LoadingContextProvider>
			</NotificationContextProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
