import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {}

	// allow configuration using `createTheme`
	interface ThemeOptions {}
}

export const theme = createTheme({
	palette: {
		mode: "dark",
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 800,
			md: 1000,
			lg: 1200,
			xl: 1536,
		},
	},
});
