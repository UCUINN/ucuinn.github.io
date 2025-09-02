import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import icoBackground from "../img/logo_en.svg";
import rec12 from "../img/rec12pic.webp";
import rec13 from "../img/rec13pic.webp";
import bookingAward from "../img/booking-award.webp";

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const Additional = memo(() => {
	const { t } = useTranslation();

	return (
		<section
			id="additional"
			className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
		>
			<div
				className="absolute inset-0 opacity-10 bg-repeat bg-center"
				style={{
					backgroundImage: `url(${icoBackground})`,
					backgroundSize: "300px auto",
				}}
			/>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10"
			>
				<motion.div
					variants={cardVariants}
					className="flex flex-col justify-center group"
				>
					<div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
						<div className="aspect-[3/4] relative">
							<img
								src={rec12}
								loading="lazy"
								decoding="async"
								width="600"
								height="800"
								alt={t("additional.bathroom.alt")}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
						>
							<p className="text-white text-lg font-medium backdrop-blur-sm bg-black/30 rounded-xl p-4">
								✨ {t("additional.bathroom.description")}
							</p>
						</motion.div>
					</div>
				</motion.div>
				<div className="flex flex-col gap-8">
					<motion.div
						variants={cardVariants}
						className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl"
					>
						<div className="relative">
							<img
								src={rec13}
								loading="lazy"
								decoding="async"
								width="800"
								height="600"
								alt={t("additional.lounge.alt")}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
						>
							<p className="text-white text-lg font-medium backdrop-blur-sm bg-black/30 rounded-xl p-4">
								🛋️ {t("additional.lounge.description")}
							</p>
						</motion.div>
					</motion.div>

					<motion.div
						variants={cardVariants}
						className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl"
					>
						<div className="relative">
							<img
								src={bookingAward}
								loading="lazy"
								decoding="async"
								width="800"
								height="600"
								alt={t("additional.award.alt")}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
						>
							<p className="text-white text-lg font-medium backdrop-blur-sm bg-black/30 rounded-xl p-4">
								🏆 {t("additional.award.title")}
							</p>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
});

Additional.displayName = "Additional";
export default Additional;
