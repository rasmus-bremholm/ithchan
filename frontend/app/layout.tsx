import type { Metadata } from "next";
import ThemeRegistry from "./utils/ThemeRegistry";
import { UserPrefsContextProvider } from "./utils/UserPrefContext";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
	title: "ITHCHAN | Boards",
	description: "Board selection of ITHCHAN the totally original imageboard.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<ThemeRegistry>
					<UserPrefsContextProvider>
						<Navbar />
						{children}
					</UserPrefsContextProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
