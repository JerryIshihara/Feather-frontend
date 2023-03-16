import React from "react";

interface LoadingContextType {
	loading: boolean;
	message: string;
	show: (message: string) => void;
	hide: () => void;
}

const LoadingContext = React.createContext<LoadingContextType>({
	loading: false,
	message: "Loading...",
	show: (message: string) => {},
	hide: () => {},
});

export const LoadingContextProvider = (props: any) => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>("Loading...");

	return (
		<LoadingContext.Provider
			value={{
				loading,
				message,
				show: (message: string) => {
					setMessage(message);
					setLoading(true);
				},
				hide: () => {
					setLoading(false);
				},
			}}
		>
			{props.children}
		</LoadingContext.Provider>
	);
};

export function useLoading() {
	return React.useContext(LoadingContext);
}
