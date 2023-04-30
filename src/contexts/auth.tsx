import React, { useState, useEffect, useCallback } from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useLoading } from "./loading";
import { useNotification } from "./notification";

interface AuthContextProps {
	user?: object | null;
	loading: boolean;
	plan: string | undefined;
	signout: () => Promise<any>;
	signup: (email: string, password: string) => Promise<any>;
	login: (email: string, password: string) => Promise<any>;
	confirmSignUp: (email: string, code: string) => Promise<any>;
	resendConfirmationCode: (email: string) => Promise<any>;
	loginWithGoogle: () => Promise<any>;
	subscribe: (plan: string) => Promise<any>;
	// loginWithApple: () => void;
	// loginWithCryptoWallet: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps>>({ loading: false });

export const AuthContextProvider = (props: any) => {
	const notification = useNotification();
	const loader = useLoading();
	const [user, setUser] = useState<object | null>(null);
	const [plan, setPlan] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	// async function getUser() {
	// 	try {
	// 		const token = await Auth.currentAuthenticatedUser();
	// 		setUser(token);
	// 		console.log(token);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	useEffect(() => {
		setLoading(true);
		const unsubscribe = Hub.listen("auth", ({ payload }) => {
			switch (payload.event) {
				case "signIn":
					setUser(payload.data);
					break;
				case "signOut":
					setUser(unsubscribe);
					break;
				case "autoSignIn":
					setUser(payload.data);
					break;
				case "signIn_failure":
					notification?.pop({ status: "error", message: payload.data.message });
					break;
				default:
					if (payload.data && payload.data.message) notification?.pop({ status: "info", message: payload.data.message });
			}
		});
		Auth.currentAuthenticatedUser()
			.then(currentUser => {
				console.log(currentUser);
				setUser(currentUser);
			})
			.catch(() => {});
		setLoading(false);
		return unsubscribe;
	}, []);

	// useEffect(() => {
	// 	const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
	// 		switch (event) {
	// 			case "signIn":
	// 				setCognitoUser(data);
	// 				break;
	// 			case "signOut":
	// 				setCognitoUser(unsubscribe);
	// 				break;
	// 			case "customOAuthState":
	// 				setCognitoUser(data);
	// 		}
	// 	});
	// 	Auth.currentAuthenticatedUser()
	// 		.then(currentUser => {
	// 			console.log(currentUser);
	// 			setCognitoUser(currentUser);
	// 		})
	// 		.catch(() => console.log("Not signed in"));
	// 	return unsubscribe;
	// }, []);

	//////////////////////////////// Public Methods //////////////////////////////
	const signout = async () => {
		try {
			loader.show("Signing out");
			const res = await Auth.signOut();
			setUser(null);
			return Promise.resolve(res);
		} catch (err: any) {
			return Promise.reject(user);
		} finally {
			loader.hide();
		}
	};
	const signup = async (email: string, password: string) => {
		try {
			loader.show("Signing up");
			const res = await Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
				},
				autoSignIn: {
					enabled: true,
				},
			});
			res.user && setUser(res.user);
			return Promise.resolve(res);
		} catch (err: any) {
			return Promise.reject(err);
		} finally {
			loader.hide();
		}
	};
	const login = async (email: string, password: string, onNotConfirmed?: () => void) => {
		try {
			loader.show("Logging in...");
			const user = await Auth.signIn(email, password);
			setUser(user);
			return Promise.resolve(user);
		} catch (err: any) {
			return Promise.reject(err);
		} finally {
			loader.hide();
		}
	};
	const confirmSignUp = async (email: string, code: string) => {
		try {
			setLoading(true);
			const res = await Auth.confirmSignUp(email, code, { forceAliasCreation: false });
			return Promise.resolve(res);
		} catch (err: any) {
			return Promise.reject(err);
		} finally {
			setLoading(false);
		}
	};
	const resendConfirmationCode = async (email: string) => {
		try {
			setLoading(true);
			const res = await Auth.resendSignUp(email);
			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setLoading(false);
		}
	};
	const loginWithGoogle = async () => {
		try {
			loader.show("Signing in with Google...");
			const res = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
			return Promise.resolve(res);
		} catch (err: any) {
			return Promise.reject(err);
		} finally {
			loader.hide();
		}
	};

	const subscribe = async (newPlan: string) => {
		return new Promise(resolve => {
			setTimeout(() => {
				setPlan(newPlan);
				resolve("success");
			}, 2000);
		});
	};
	// const loginWithApple = async () => {
	// 	const { wallet } = await Web3Auth.appleLogin();
	// 	const signMessage = async (m: string) => await wallet.signMessage(m);
	// 	_cognitoSignInWithKeyPair(wallet.address, signMessage);
	// };

	//////////////////////////////// Private Methods //////////////////////////////

	return (
		<AuthContext.Provider
			value={{
				user,
				plan,
				loading,
				signout,
				signup,
				login,
				confirmSignUp,
				resendConfirmationCode,
				loginWithGoogle,
				subscribe,
				// loginWithApple,
				// getTokenFromSecureStore,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return React.useContext(AuthContext);
}
