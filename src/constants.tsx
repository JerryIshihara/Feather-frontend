type HeaderRoutesType = { [key: string]: string };
export const HeaderRoutes: HeaderRoutesType = {
	Home: "/",
	Feed: "/feed",
	Booking: "/booking",
	Pricing: "/pricing",
};

type RoutePathNameType = { [key: string]: string };
export const RoutePathName: RoutePathNameType = {
	landing: "/",
	dashboard: "/dashboard",
	login: "/auth/login",
};
export type PathNameType = typeof RoutePathName[string];
