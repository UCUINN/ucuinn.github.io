import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CalendarCheck } from "lucide-react";

const MobileBookingButton = () => {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 500);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="md:hidden fixed bottom-6 right-6 z-40">
			<a
				href="https://booking-universitycentre.otelms.com/booking/rooms/"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 hover:scale-110"
				aria-label={t("nav.book")}
			>
				<CalendarCheck className="w-6 h-6" />
			</a>
		</div>
	);
};

export default MobileBookingButton;
