import React, { useState, useEffect, useCallback } from "react";
import { Alert, Snackbar, AlertColor } from "@mui/material";
import { Auth, Hub } from "aws-amplify";

interface PopProps {
	status: AlertColor;
	message: string;
}
interface NotificationContextProps {
	props: PopProps;
	show: boolean;
	pop: (props: PopProps) => void;
}

export const NotificationContext = React.createContext<NotificationContextProps>({
	show: false,
	props: { status: "info", message: "" },
	pop: () => {},
});

export const NotificationContextProvider = (contextProps: any) => {
	const [show, setShow] = useState<boolean>(false);
	const [props, setProps] = useState<PopProps>({ status: "info", message: "" });

	const pop = (props: PopProps) => {
		setShow(true);
		setProps(props);
		setTimeout(() => setShow(false), 3000);
	};

	return (
		<NotificationContext.Provider
			value={{
				show,
				pop,
				props,
			}}
		>
			{contextProps.children}
		</NotificationContext.Provider>
	);
};

export function useNotification() {
	return React.useContext(NotificationContext);
}
