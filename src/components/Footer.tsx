import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface FooterProps {
	className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
	const { t } = useTranslation();
	const [currentTime, setCurrentTime] = useState(() => new Date());

	const formatTime = useCallback((date: Date): string => {
		return date.toLocaleTimeString("uk-UA", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<footer
			className={`bg-primary-900 text-white py-6 px-4 border-t border-primary-800 ${className ?? ""}`}
		>
			<div className="container mx-auto text-center">
				<div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
					<span className="font-semibold">© {currentTime.getFullYear()}</span>
					<span className="text-primary-200 font-medium">{formatTime(currentTime)}</span>
					<span className="text-primary-100">{t("footer.copyright")}</span>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = "Footer";

export default Footer;
