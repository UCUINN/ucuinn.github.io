import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone, Accessibility, Clock } from "lucide-react";
import { cn } from "../utils/ui";
import logoEn from "../img/logo_en.svg";
import logoUa from "../img/logo_ua.svg";
import finImg from "../img/fin.png";

const Header = () => {
	const { t, i18n } = useTranslation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [activeSection, setActiveSection] = useState<string>("");
	const [showFin, setShowFin] = useState(true);

	// Easter egg: Fin mascot - click to toggle visibility
	const toggleFin = () => {
		setShowFin(prev => !prev);
	};

	// Track active section based on scroll position
	const updateActiveSection = useCallback(() => {
		const sections = ["rooms", "contacts", "gallery", "prices", "location", "faq"];
		const scrollPosition = window.scrollY + 150;

		for (const section of sections) {
			const element = document.getElementById(section);
			if (element) {
				const { offsetTop, offsetHeight } = element;
				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
					setActiveSection(`#${section}`);
					return;
				}
			}
		}
		setActiveSection("");
	}, []);

	// Hide/show header on scroll and track active section
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < 10) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY) {
				// Scrolling down
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
			updateActiveSection();
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, updateActiveSection]);

	// Keyboard navigation: Close menu on Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [isMenuOpen]);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const navigationItems = [
		{ href: "#rooms", label: t("nav.info") },
		{ href: "#contacts", label: t("nav.contacts") },
		{ href: "#gallery", label: t("nav.gallery") },
		{ href: "#prices", label: t("nav.prices") },
		{ href: "#location", label: t("nav.location") },
		{ href: "#faq", label: t("nav.faq") },
		{
			href: "https://booking-universitycentre.otelms.com/booking/rooms/",
			target: "_blank",
			rel: "noopener noreferrer",
			label: t("nav.book"),
			isHighlighted: true,
		},
	];

	const isActive = (href: string) => activeSection === href;

	const logoImage = i18n.language === "en" ? logoEn : logoUa;

	return (
		<>
		<header
			className={cn(
				"bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-gray-100",
				isVisible ? "translate-y-0" : "-translate-y-full",
			)}
		>
			<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
				<nav className="flex justify-between items-center py-4">
					{/* Logo */}
					<a
						href="#"
						className="relative group"
					>
						<img
							src={logoImage}
							alt="UCU INN Logo"
							decoding="async"
							className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
						/>
					</a>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-2 lg:space-x-4">
						{navigationItems.map(item => (
							<a
								key={item.href}
								href={item.href}
								target={item.target}
								rel={item.rel}
								className={cn(
									"px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200",
									item.isHighlighted
										? "bg-gray-900 text-white rounded-full hover:bg-gray-800"
										: isActive(item.href)
											? "text-gray-900"
											: "text-gray-500 hover:text-gray-900",
								)}
							>
								{item.label}
								{isActive(item.href) && !item.isHighlighted && (
									<span className="block h-0.5 w-full bg-gray-900 mt-0.5 rounded-full" />
								)}
							</a>
						))}
					</div>

					{/* Desktop Language & Phone */}
					<div className="hidden md:flex items-center space-x-3 lg:space-x-6">
						{/* Language Switcher */}
						<div className="flex items-center bg-transparent p-0 rounded-lg">
							<button
								onClick={() => changeLanguage("en")}
								className={cn(
									"px-1 py-1 rounded-md text-xs font-semibold transition-all duration-300 min-w-0",
									i18n.language === "en"
										? "bg-white text-gray-700 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-white/50",
								)}
							>
								<span className="sm:hidden">🇺🇸</span>
								<span className="hidden sm:inline">🇺🇸 EN</span>
							</button>
							<button
								onClick={() => changeLanguage("ua")}
								className={cn(
									"px-1 py-1 rounded-md text-xs font-semibold transition-all duration-300 min-w-0",
									i18n.language === "ua"
										? "bg-white text-gray-700 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-white/50",
								)}
							>
								<span className="sm:hidden">🇺🇦</span>
								<span className="hidden sm:inline">🇺🇦 UA</span>
							</button>
						</div>

						{/* Contact Info */}
						<div className="hidden xl:flex flex-col items-end space-y-0.5">
							<a
								href="tel:+380967567206"
								className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors font-medium text-xs"
							>
								<Phone className="w-3 h-3 text-gray-400" />
								<span>096-75-67-206</span>
							</a>
							<div className="flex items-center space-x-1 text-gray-400 text-xs">
								<Clock className="w-2.5 h-2.5" />
								<span>{t("nav.workingHours")}</span>
							</div>
						</div>

						{/* Accessibility Link */}
						<a
							href="https://forms.gle/CaMuKHii8wsFkQZy9"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-105"
							title="Request accessibility assistance"
							aria-label="Request accessibility assistance"
						>
							<div className="bg-gray-50 p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-300">
								<Accessibility className="w-4 h-4 text-gray-500" />
							</div>
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</nav>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)]">
					<div className="px-4 py-6 space-y-3 pb-32">
						{navigationItems.map(item => (
							<a
								key={item.href}
								href={item.href}
								target={item.target}
								rel={item.rel}
								className={cn(
									"block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300",
									item.isHighlighted
										? "bg-gray-900 text-white shadow-md hover:bg-gray-800 hover:shadow-lg"
										: "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
								)}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.label}
							</a>
						))}

						{/* Mobile Contact */}
						<a
							href="tel:+380967567206"
							className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300"
							onClick={() => setIsMenuOpen(false)}
						>
							<div className="bg-gray-100 p-2 rounded-full">
								<Phone className="w-5 h-5" />
							</div>
							<span className="font-medium">096-75-67-206</span>
						</a>

						{/* Mobile Accessibility Link */}
						<a
							href="https://forms.gle/CaMuKHii8wsFkQZy9"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
							title="Accessibility Service"
						>
							<div className="bg-gray-100 p-3 rounded-full border border-gray-200 shadow-sm">
								<Accessibility className="w-6 h-6 text-gray-600" />
							</div>
							<span className="font-semibold text-gray-700">
								Accessibility Service
							</span>
						</a>

						{/* Mobile Language Switcher */}
						<div className="flex items-center justify-around pt-4 border-t border-gray-100">
							<button
								onClick={() => {
									changeLanguage("en");
									setIsMenuOpen(false);
								}}
								className={cn(
									"px-6 py-2.5 rounded-xl text-base font-medium transition-all duration-300",
									i18n.language === "en"
										? "bg-gray-100 text-gray-700 shadow-sm"
										: "text-gray-700 hover:bg-gray-50",
								)}
							>
								🇺🇸 English
							</button>
							<button
								onClick={() => {
									changeLanguage("ua");
									setIsMenuOpen(false);
								}}
								className={cn(
									"px-6 py-2.5 rounded-xl text-base font-medium transition-all duration-300",
									i18n.language === "ua"
										? "bg-gray-100 text-gray-700 shadow-sm"
										: "text-gray-700 hover:bg-gray-50",
								)}
							>
								🇺🇦 Українська
							</button>
						</div>
					</div>
				</div>
			)}
		</header>

		{/* Easter egg: Fin mascot in the bottom-left corner */}
		<div
			className={cn(
				"fixed left-0 z-[60] cursor-pointer select-none transition-all duration-700 ease-in-out",
				showFin ? "bottom-0" : "-bottom-32",
			)}
			aria-hidden="true"
			onClick={toggleFin}
		>
			<img
				src={finImg}
				alt=""
				className="w-32 h-auto"
			/>
		</div>
		</>
	);
};

export default Header;
