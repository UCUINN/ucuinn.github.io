import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
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
			className="relative py-20 overflow-hidden"
		>
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
			<div
				className="absolute inset-0 opacity-5 bg-repeat bg-center -z-10"
				style={{
					backgroundImage: `url(${icoBackground})`,
					backgroundSize: "300px auto",
				}}
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
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
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
							</div>
							{/* Award info overlay - always visible */}
							<div className="absolute bottom-0 left-0 right-0 p-5">
								<div className="backdrop-blur-sm bg-white/95 rounded-xl p-4 shadow-lg">
									<div className="flex items-center gap-3 mb-2">
										<div className="flex items-center gap-1">
											<Star className="w-5 h-5 text-amber-500 fill-amber-500" />
											<span className="text-2xl font-bold text-gray-900">{t("additional.award.rating")}</span>
										</div>
										<span className="text-xs text-gray-500 font-medium">{t("additional.award.ratingLabel")}</span>
									</div>
									<p className="text-sm text-gray-600 mb-3 italic">
										"{t("additional.award.quote")}"
									</p>
									<a
										href="https://www.booking.com/hotel/ua/university-centre.uk.html#tab-reviews"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
									>
										{t("additional.award.readReviews")}
										<ExternalLink className="w-4 h-4" />
									</a>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
});

Additional.displayName = "Additional";
export default Additional;
