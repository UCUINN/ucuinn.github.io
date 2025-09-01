import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { fadeInUpVariant, staggerContainer } from "../utils/ui";

export const Hero = () => {
	const { t } = useTranslation();
	const { scrollY } = useScroll();
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);
	const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
	const textY = useTransform(scrollY, [0, 300], [0, 100]);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image with Parallax Effect */}
			<motion.div
				initial={{ scale: 1.1 }}
				animate={{ scale: 1 }}
				transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
				style={{ scale }}
				className="absolute inset-0 overflow-hidden"
			>
				<div className="relative w-full h-full">
					<img
						src="src/img/rec3pic.webp"
						alt="UCU INN Background"
						width={1920}
						height={1080}
						loading="eager"
						decoding="async"
						className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-all will-change-transform"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
				</div>
			</motion.div>

			{/* Content */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
				style={{ opacity, y: textY }}
				className="relative z-10 text-left text-white px-4 max-w-7xl mx-auto w-full flex flex-col will-change-transform"
			>
				<motion.h1
					variants={fadeInUpVariant}
					className="text-6xl md:text-8xl font-bold mb-8 tracking-tight drop-shadow-2xl will-change-transform"
				>
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white">
						UCU INN
					</span>
				</motion.h1>

				<motion.div
					variants={fadeInUpVariant}
					className="flex flex-col items-start gap-8 mb-14"
				>
					<p className="text-xl md:text-2xl font-light leading-relaxed drop-shadow-lg max-w-md">
						{t("hero.description")}
					</p>
					<p className="text-lg md:text-xl text-gray-200 drop-shadow-lg max-w-md">
						{t("hero.location")}
					</p>
				</motion.div>

				<motion.div
					variants={fadeInUpVariant}
					className="flex flex-col sm:flex-row gap-6"
				>
					<a
						href="https://booking-universitycentre.otelms.com/booking/rooms/en"
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center justify-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
					>
						<Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
						<span className="font-medium tracking-wide">{t("hero.bookNow")}</span>
					</a>
					<a
						href="#gallery"
						className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30 transform hover:scale-105 hover:shadow-xl shadow-lg"
					>
						<span className="font-medium tracking-wide">{t("hero.viewRooms")}</span>
					</a>
				</motion.div>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.5 }}
				style={{ opacity }}
				className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
			>
				<motion.p
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="text-white/80 text-sm tracking-wider uppercase"
				></motion.p>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					className="w-8 h-14 border-2 border-white/80 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
				>
					<motion.div
						animate={{ y: [0, 16, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
						className="w-1 h-3 bg-white rounded-full"
					/>
				</motion.div>
				<motion.div
					animate={{ y: [0, 5, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
				>
					<ChevronDown className="w-6 h-6 text-white/80" />
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Hero;
