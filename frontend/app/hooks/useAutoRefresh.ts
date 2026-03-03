import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAutoRefresh(interval: number = 30) {
	const router = useRouter();
	const [countdown, setCountdown] = useState(interval);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					router.refresh();
					return interval;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [interval, router]);

	return countdown;
}
