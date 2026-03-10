import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUpVariant, staggerContainer } from "../utils/ui";
import heroBg from "../img/rec3pic.webp";

export const Hero = () => {
	const { t } = useTranslation();
	const { scrollY } = useScroll();
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);
	const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
	const textY = useTransform(scrollY, [0, 300], [0, 100]);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32">
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
						src={heroBg}
						alt="UCU INN Background"
						width={1920}
						height={1080}
						loading="eager"
						decoding="async"
						className="absolute inset-0 w-full h-full object-cover brightness-[0.4] object-right transition-all will-change-transform"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
				</div>
			</motion.div>

			{/* Content */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
				style={{ opacity, y: textY }}
				className="relative z-10 text-left text-white px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col will-change-transform"
			>
				<motion.h1
					variants={fadeInUpVariant}
					className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight drop-shadow-2xl will-change-transform"
				>
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90 font-display">
						UCU INN
					</span>
				</motion.h1>

				<motion.div
					variants={fadeInUpVariant}
					className="flex flex-col items-start gap-4 mb-12"
				>
					<p className="text-xl md:text-2xl font-light leading-relaxed text-white/90 max-w-xl mb-2">
						{t("hero.description")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-base text-white/80 font-light">
						{t("hero.subtitle").split(' • ').map((item, index) => (
							<div
								key={index}
								className="flex items-center gap-2"
							>
								{item.trim()}
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					variants={fadeInUpVariant}
					className="flex flex-col sm:flex-row gap-6"
				>
					<motion.a
						href="https://booking-universitycentre.otelms.com/booking/rooms/en"
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium tracking-wide relative overflow-hidden"
						animate={{
							scale: [1, 1.05, 1],
							boxShadow: [
								"0 0 0 0 rgba(255, 255, 255, 0.7)",
								"0 0 0 10px rgba(255, 255, 255, 0)",
								"0 0 0 0 rgba(255, 255, 255, 0)",
							],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: "loop",
							ease: "easeInOut",
						}}
						whileHover={{
							scale: 1.1,
							boxShadow: "0 10px 30px rgba(255, 255, 255, 0.5)",
						}}
					>
						<motion.span
							animate={{
								textShadow: [
									"0 0 10px rgba(255, 255, 255, 0.8)",
									"0 0 20px rgba(255, 255, 255, 1)",
									"0 0 10px rgba(255, 255, 255, 0.8)",
								],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "loop",
								ease: "easeInOut",
							}}
						>
							{t("hero.bookNow")}
						</motion.span>
						<motion.svg 
							className="w-4 h-4" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
							animate={{
								x: [0, 3, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								repeatType: "loop",
								ease: "easeInOut",
							}}
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</motion.svg>
					</motion.a>
					<a
						href="#rooms"
						className="inline-flex items-center justify-center gap-2 text-white border border-white/30 px-6 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white rounded-full"
					>
						{t("hero.viewRooms")}
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
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
