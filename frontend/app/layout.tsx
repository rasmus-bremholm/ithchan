import type { Metadata } from "next";
import ThemeRegistry from "./utils/ThemeRegistry";
import { UserPrefsContextProvider } from "./utils/UserPrefContext";
import { PostFormContextProvider } from "./utils/PostFormContext";
import Navbar from "./components/Navbar";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
	title: "ITHCHAN | Boards",
	description: "Board selection of ITHCHAN the totally original imageboard.",
};

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ibm-plex-sans",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-jetbrains-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
			<body>
				<ThemeRegistry>
					<UserPrefsContextProvider>
						<PostFormContextProvider>
							<Navbar />
							{children}
						</PostFormContextProvider>
					</UserPrefsContextProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
