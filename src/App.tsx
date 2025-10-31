import { Suspense, lazy, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Room from "./components/Room";
import Location from "./components/Location";
import Footer from "./components/Footer";
import LazySection from "./components/LazySection";
import BackToTop from "./components/BackToTop";
const Gallery = lazy(() => import("./components/Gallery"));
const PriceList = lazy(() => import("./components/PriceList"));
const Additional = lazy(() => import("./components/Additional"));
const FAQ = lazy(() => import("./components/FAQ"));
const Booking = lazy(() => import("./components/Booking"));
const Contact = lazy(() => import("./components/Contact"));

import ErrorBoundary from "./components/ErrorBoundary";
import { GallerySkeleton, PriceListSkeleton } from "./components/skeletons";
import "./index.css";

const SectionFallback = ({ label }: { label: string }) => (
	<section
		aria-label={label}
		className="py-20"
	>
		<div className="mx-auto max-w-7xl px-4">
			<div className="h-60 w-full animate-pulse rounded-3xl bg-gray-100" />
		</div>
	</section>
);

type IdleWindow = Window & {
	requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
	cancelIdleCallback?: (handle: number) => void;
};

const App = () => {
	useEffect(() => {
		const loaders = [
			() => import("./components/Gallery"),
			() => import("./components/PriceList"),
			() => import("./components/Additional"),
			() => import("./components/FAQ"),
			() => import("./components/Booking"),
			() => import("./components/Contact"),
		];

		const runPrefetch = () => {
			loaders.forEach(load => {
				void load();
			});
		};

		const browserWindow: IdleWindow | undefined =
			typeof window !== "undefined" ? (window as IdleWindow) : undefined;

		if (!browserWindow) {
			return undefined;
		}

		let idleId: number | undefined;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		if (typeof browserWindow.requestIdleCallback === "function") {
			idleId = browserWindow.requestIdleCallback(
				() => {
					runPrefetch();
				},
				{ timeout: 3000 },
			);
		} else {
			timeoutId = setTimeout(runPrefetch, 1500);
		}

		return () => {
			if (
				typeof idleId === "number" &&
				typeof browserWindow.cancelIdleCallback === "function"
			) {
				browserWindow.cancelIdleCallback(idleId);
			}
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	return (
		<ErrorBoundary>
			<a
				href="#main"
				className="skip-to-content"
			>
				Skip to main content
			</a>
			<Header />
			<main
				id="main"
				className="min-h-screen pt-16"
			>
				<ErrorBoundary>
					<Hero />
				</ErrorBoundary>
				<ErrorBoundary>
					<Room />
				</ErrorBoundary>
				<ErrorBoundary>
					<Location />
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="gallery"
						fallback={<GallerySkeleton />}
					>
						<Suspense fallback={<GallerySkeleton />}>
							<Gallery />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="prices"
						fallback={<PriceListSkeleton />}
					>
						<Suspense fallback={<PriceListSkeleton />}>
							<PriceList />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="additional"
						fallback={<SectionFallback label="Additional amenities loading" />}
					>
						<Suspense
							fallback={<SectionFallback label="Additional amenities loading" />}
						>
							<Additional />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="faq"
						fallback={<SectionFallback label="FAQ loading" />}
					>
						<Suspense fallback={<SectionFallback label="FAQ loading" />}>
							<FAQ />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="booking"
						fallback={<SectionFallback label="Booking widget loading" />}
					>
						<Suspense fallback={<SectionFallback label="Booking widget loading" />}>
							<Booking />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
				<ErrorBoundary>
					<LazySection
						id="contacts"
						fallback={<SectionFallback label="Contact information loading" />}
					>
						<Suspense
							fallback={<SectionFallback label="Contact information loading" />}
						>
							<Contact />
						</Suspense>
					</LazySection>
				</ErrorBoundary>
			</main>
			<Footer />
			<BackToTop />
		</ErrorBoundary>
	);
};

export default App;
