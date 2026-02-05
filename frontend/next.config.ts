import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "5041", // Match the port in your URL
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
